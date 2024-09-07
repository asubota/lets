self.addEventListener('notificationclick', (event) => {
  const data = event.notification.data

  const doNavigation = async () => {
    return clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        const focusedClient = windowClients.find(
          (client) => 'focus' in client && client.focused,
        )

        if (focusedClient) {
          focusedClient.postMessage({
            type: 'navigate',
            ...data,
          })
        } else {
          clients.openWindow(data.url)
        }
      })
  }

  event.waitUntil(doNavigation().then(() => event.notification.close()))
})
