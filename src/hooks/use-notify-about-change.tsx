import { useEffect } from 'react'

import { toast } from 'react-toastify'

import { NotificationSnackbar } from '../components/notification-snackbar.tsx'
import { type AppMessage, type AppMessagePush, type FavNotification } from '../types.ts'
import { useGetNotifications } from './use-get-notifications.ts'

const showNotification = async () => {
  const result = await Notification.requestPermission()
  if (result !== 'granted' || !('serviceWorker' in navigator)) {
    return
  }

  await navigator.serviceWorker.ready
  if (navigator.serviceWorker.controller) {
    const message: AppMessagePush = {
      type: 'push-me',
      payload: {
        title: 'Мущіна, там щось оновилось...',
        options: {
          icon: '/lets/logo.webp',
          data: {
            to: '/favorites',
          },
        },
      },
    }

    navigator.serviceWorker.controller.postMessage(message)
  }
}

const showAlert = (n: FavNotification) => {
  toast.warn(<NotificationSnackbar n={n} />, {
    position: 'bottom-left',
    autoClose: false,
    hideProgressBar: true,
    theme: 'colored',
    icon: false,
  })
}

export const useNotifyAboutChange = () => {
  const notifications = useGetNotifications('unread')

  useEffect(() => {
    const handleMessage = (event: MessageEvent<AppMessage>) => {
      if (event.data.type === 'SYNC_END') {
        for (const n of notifications) {
          showAlert(n)
        }

        if (notifications.length > 0) {
          void showNotification()
        }
      }
    }

    navigator.serviceWorker.addEventListener('message', handleMessage)

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage)
    }
  }, [notifications])
}
