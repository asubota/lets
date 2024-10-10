import { AppMessage, NotificationData } from './types.ts'
import { parseData } from './data-tools.ts'

const sw = self as unknown as ServiceWorkerGlobalScope

async function fetchAndCache(request: FetchEvent['request'], cache: Cache) {
  const networkResponse = await fetch(request)

  await cache.put(request, networkResponse.clone())
  await cache.put(`${request.url}-time`, new Response(Date.now().toString()))

  return networkResponse
}

function isStale(cachedDate: Date, currentDate: Date) {
  const currentHour = currentDate.getHours()
  const cachedHour = cachedDate.getHours()

  return (
    currentDate.getDate() !== cachedDate.getDate() || currentHour !== cachedHour
  )
}

function notifyAppAboutCacheReset(count: number) {
  sw.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      const message: AppMessage = { type: 'cache-update', payload: { count } }
      client.postMessage(message)
    })
  })
}

sw.addEventListener('notificationclick', (event) => {
  const data: NotificationData = event.notification.data

  const doNavigation = async () => {
    return sw.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        const focusedClient = windowClients.find(
          (client) => 'focus' in client && client.focused,
        )

        if (focusedClient) {
          const message: AppMessage = {
            type: 'navigate',
            payload: {
              sku: data.sku,
              to: data.to,
            },
          }

          focusedClient.postMessage(message)
        } else {
          sw.clients.openWindow('/lets/')
        }
      })
  }

  event.waitUntil(doNavigation().then(() => event.notification.close()))
})

sw.addEventListener('message', async (event) => {
  const message: AppMessage = event.data

  // if (message.type === 'xxx') {
  //   notifyAppAboutCacheReset(123)
  // }

  if (message.type === 'push-me') {
    await sw.registration.showNotification(
      message.payload.title,
      message.payload.options,
    )
  }
})

sw.addEventListener('fetch', (event) => {
  const {
    request: { url, method },
  } = event

  if (method === 'GET' && url.includes('docs.google.com')) {
    const response = sw.caches.open('lets-bike-api').then(async (cache) => {
      const cachedResponse = await cache.match(event.request)

      if (cachedResponse) {
        const cachedTime = await cache.match(`${event.request.url}-time`)

        if (cachedTime) {
          const cachedDate = new Date(Number(await cachedTime.text()))
          const now = new Date()

          if (isStale(cachedDate, now) || 2 > 1) {
            console.log('Cache is stale, fetching new data...')

            fetchAndCache(event.request, cache).then((response) => {
              response.text().then((text) => {
                const items = parseData(text)

                console.log('Cache updated, app notified.')
                notifyAppAboutCacheReset(items.length)
              })
            })
          } else {
            console.log('Cache is still valid, returning cached data.')
          }

          return cachedResponse
        }
      }

      console.log('No cache found, fetching new data...')
      return fetchAndCache(event.request, cache)
    })

    event.respondWith(response)
  }
})
