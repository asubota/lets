import { useLinkProps } from '@tanstack/react-router'

export const useShowNotification = (s: string) => {
  const { href: to } = useLinkProps({ to: '/', search: { s } })

  return () => {
    const options: NotificationOptions = {
      icon: '/lets/logo.webp',
      body: s,
      data: { s, to },
    }

    Notification.requestPermission().then((result) => {
      if (result === 'granted' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((sw) => {
          return sw.showNotification('Мущіна, ХУЙ!', options)
        })
      }
    })
  }
}
