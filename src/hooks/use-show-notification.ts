import { NotificationData } from '../types.ts'

export const useShowNotification = () => {
  return (title: string, body: string, sku: string) => {
    const data: NotificationData = { s: sku, to: '/', sku, type: 'navigate' }

    const options: NotificationOptions = {
      icon: '/lets/logo.webp',
      body,
      data,
    }

    Notification.requestPermission().then((result) => {
      if (result === 'granted' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((sw) => {
          return sw.showNotification(title, options)
        })
      }
    })
  }
}
