import { useEffect } from 'react'
import { AppMessage, AppMessagePush, FavNotification } from '../types.ts'
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from 'notistack'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { NotificationSnackbar } from '../components/notification-snackbar.tsx'
import { useGetNotifications } from './use-get-notifications.ts'

const showNotification = () => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        if (navigator.serviceWorker.controller) {
          const message: AppMessagePush = {
            type: 'push-me' as const,
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

const action = (snackbarId: SnackbarKey) => (
  <IconButton onClick={() => closeSnackbar(snackbarId)}>
    <Close />
  </IconButton>
)

const showAlert = (n: FavNotification) => {
  enqueueSnackbar({
    message: <NotificationSnackbar n={n} />,
    persist: true,
    variant: 'warning',
    hideIconVariant: true,
    preventDuplicate: true,
    action,
  })
}

export const useNotifyAboutChange = () => {
  const notifications = useGetNotifications()

  useEffect(() => {
    const fn = async (event: MessageEvent<AppMessage>) => {
      if (event.data && event.data.type === 'cache-update') {
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
