import { SUPABASE_ANON_KEY, SUPABASE_URL } from './constants'
import { mapToProduct } from './data-mapping'
import { parseData } from './data-tools'
import { db } from './db'
import { type AppMessage, type NotificationData } from './types'

const CACHE_NAME = 'lets-bike-api'
const PAGE_SIZE = 1000

const sw = self as unknown as ServiceWorkerGlobalScope

console.log('[SW] Service Worker script loaded. Version: 1.0.1')

sw.addEventListener('install', () => {
  console.log('[SW] Install event')
  sw.skipWaiting()
})

sw.addEventListener('activate', (event) => {
  console.log('[SW] Activate event')
  event.waitUntil(sw.clients.claim())
})

let syncProgress: { loaded: number; total: number; percent: number } | null = null
let isSyncing = false

async function fetchAndCache(request: FetchEvent['request'], cache: Cache) {
  const networkResponse = await fetch(request)

  await cache.put(request, networkResponse.clone())
  await cache.put(`${request.url}-time`, new Response(Date.now().toString()))

  return networkResponse
}

function isStale(cachedDate: Date, currentDate: Date) {
  const currentHour = currentDate.getHours()
  const cachedHour = cachedDate.getHours()

  return currentDate.getDate() !== cachedDate.getDate() || currentHour !== cachedHour
}

function notifyApp(message: AppMessage) {
  sw.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
    // console.log(`[SW] Notifying ${clients.length} clients:`, message.type)
    clients.forEach((client) => client.postMessage(message))
  })
}

function notifyAppAboutCacheReset(count: number) {
  const message = { type: 'cache-updated', payload: { count } } as const
  notifyApp(message)
}

async function runSupabaseSync() {
  console.log('[SW] runSupabaseSync started. isSyncing:', isSyncing)
  if (isSyncing) return
  isSyncing = true
  syncProgress = { loaded: 0, total: 0, percent: 0 }

  try {
    console.log('[SW] Notifying app about SYNC_START')
    notifyApp({ type: 'SYNC_START' })

    // 1. Get total count using standard PostgREST HEAD request
    console.log('[SW] Fetching total count...')
    const countRes = await fetch(`${SUPABASE_URL}/rest/v1/active_products_snapshot?select=sku`, {
      method: 'HEAD',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'count=exact',
      },
    })

    const contentRange = countRes.headers.get('content-range')
    console.log('[SW] Content-Range:', contentRange)
    const totalCount = parseInt(contentRange?.split('/')?.[1] || '0')
    syncProgress.total = totalCount

    let from = 0
    while (true) {
      const url = `${SUPABASE_URL}/rest/v1/active_products_snapshot?select=sku,name,vendor,price,price_old,p2,stock,pics&order=sku.asc&offset=${from}&limit=${PAGE_SIZE}`
      const res = await fetch(url, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      })

      const data = await res.json()
      if (!data || data.length === 0) break

      const products = data.map(mapToProduct)
      await db.saveProducts(products)

      syncProgress.loaded += data.length
      syncProgress.percent = totalCount > 0 ? Math.round((syncProgress.loaded / totalCount) * 100) : 0

      notifyApp({
        type: 'SYNC_PROGRESS',
        payload: syncProgress,
      })

      if (data.length < PAGE_SIZE) break
      from += PAGE_SIZE

      // Small delay to prevent rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    await db.setSyncMetadata({
      time: Date.now(),
      total: totalCount,
    })

    notifyApp({
      type: 'SYNC_END',
      payload: { count: syncProgress.loaded },
    })
  } catch (error: any) {
    console.error('[SW] Sync error:', error)
    notifyApp({
      type: 'SYNC_ERROR',
      payload: { message: error.message || 'Unknown error' },
    })
  } finally {
    isSyncing = false
    syncProgress = null
  }
}

sw.addEventListener('notificationclick', (event) => {
  const data: NotificationData = event.notification.data

  const doNavigation = async () => {
    return sw.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      const focusedClient = windowClients.find((client) => 'focus' in client && client.focused)

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
  console.log('[SW] Received message:', event.data?.type)
  const message: AppMessage = event.data

  if (message.type === 'SYNC_START') {
    console.log('[SW] Handling SYNC_START')
    event.waitUntil(runSupabaseSync())
  }

  if (message.type === 'GET_SYNC_STATUS') {
    if (isSyncing && syncProgress) {
      notifyApp({
        type: 'SYNC_PROGRESS',
        payload: syncProgress,
      })
    }
  }

  if (message.type === 'cache-reset-request') {
    console.log('[SW] Resetting cache and IndexedDB...')
    await db.clearAll()
    const success = await caches.delete(CACHE_NAME)
    if (success) {
      console.log('[SW] Cache and DB cleared, notifying app...')
      notifyApp({ type: 'cache-reset-done' })
      // Re-trigger sync immediately to fill the gap
      console.log('[SW] Re-triggering sync after reset...')
      event.waitUntil(runSupabaseSync())
    }
  }

  if (message.type === 'push-me') {
    await sw.registration.showNotification(message.payload.title, message.payload.options)
  }
})

sw.addEventListener('fetch', (event) => {
  const {
    request: { url, method },
  } = event

  if (method === 'GET' && (url.includes('docs.google.com') || url.includes('supabase.co'))) {
    // For Google Docs we still use Cache API as before
    // For Supabase REST API calls, we might want to skip caching if they are part of the sync
    // but the app might still make individual calls.

    if (url.includes('supabase.co') && url.includes('/rest/v1/')) {
      // Individual Supabase REST calls can still be cached if not part of sync
    }

    const response = sw.caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request)

      if (cachedResponse) {
        const cachedTime = await cache.match(`${event.request.url}-time`)

        if (cachedTime) {
          const cachedDate = new Date(Number(await cachedTime.text()))
          const now = new Date()

          if (isStale(cachedDate, now)) {
            console.log('Cache is stale, fetching new data...')

            fetchAndCache(event.request, cache).then(async (response) => {
              const text = await response.clone().text()
              let count = 0

              if (url.includes('docs.google.com')) {
                count = parseData(text).length
              } else if (url.includes('supabase.co')) {
                // If it's a supabase call that became stale, we might want to trigger a sync instead
                // for structural consistency, but for now we just handle it as a regular fetch
                try {
                  const data = JSON.parse(text)
                  count = Array.isArray(data) ? data.length : 0
                } catch {
                  //
                }
              }

              console.log('Cache updated, app notified.')
              if (!url.includes('supabase.co')) {
                notifyAppAboutCacheReset(count)
              }
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
