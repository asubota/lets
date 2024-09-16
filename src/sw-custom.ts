const sw = self as unknown as ServiceWorkerGlobalScope

sw.addEventListener('notificationclick', (event) => {
  const data = event.notification.data

  const doNavigation = async () => {
    return sw.clients
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
          sw.clients.openWindow(data.to)
        }
      })
  }

  event.waitUntil(doNavigation().then(() => event.notification.close()))
})

sw.addEventListener('fetch', (event) => {
  console.log('## event.request.url', event.request.url)
})
