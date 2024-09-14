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
          clients.openWindow(data.to)
        }
      })
  }

  event.waitUntil(doNavigation().then(() => event.notification.close()))
})

// self.addEventListener('fetch', (event) => {
//   const { request } = event
//
//   if (request.method === 'GET' && request.url.includes('docs.google.com')) {
//     console.log('## event', event)
//
//     event.respondWith(
//       caches.open('api-cache').then((cache) => {
//         return cache.match(request).then((cachedResponse) => {
//           // If we have cached data, return it
//           debugger
//           const fetchPromise = fetch(request).then((networkResponse) => {
//             // Update the cache in the background with the new response
//             cache.put(request, networkResponse.clone())
//             return networkResponse
//           })
//
//           // Return the cached response if available, or wait for the network response
//           return cachedResponse || fetchPromise
//         })
//       }),
//     )
//   }
//
//   // if (event.request.url.includes('/api/')) {
//   //   // response to API requests, Cache Update Refresh strategy
//   // } else {
//   //   // response to static files requests, Cache-First strategy
//   // }
// })
