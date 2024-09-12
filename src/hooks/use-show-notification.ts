export const useShowNotification = () => {
  return (title: string, body: string) => {
    const options: NotificationOptions = {
      icon: '/lets/logo.webp',
      body,
      data: { s: '', to: '' },
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
