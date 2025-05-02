import { useEffect } from 'react'

import { toast } from 'react-toastify'

import { NotificationSnackbar } from '../components/notification-snackbar.tsx'
import { type AppMessage, type AppMessagePush, type FavNotification } from '../types.ts'
import { useGetNotifications } from './use-get-notifications.ts'


const showNotification = () => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
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
      })
    }
  })
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
    const fn = async (event: MessageEvent<AppMessage>) => {
      if (event.data && event.data.type === 'cache-updated') {
        notifications.forEach(showAlert)

        if (notifications.length > 0) {
          showNotification()
        }
      }
    }

    navigator.serviceWorker.addEventListener('message', fn)

    return () => {
      navigator.serviceWorker.removeEventListener('message', fn)
    }
  }, [notifications])
}
