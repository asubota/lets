self.addEventListener('notificationclick', (event) => {
  const data = event.notification.data

  const doNavigation = async () => {
    return clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (data.url.includes(client.url) && 'focus' in client) {
            client.focus()
            client.navigate(data.url)
            return
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(data.url)
        }
      })
  }

  event.waitUntil(doNavigation().then(() => event.notification.close()))
})
