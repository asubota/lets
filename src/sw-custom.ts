import { SUPABASE_ANON_KEY_KEY, SUPABASE_URL_KEY } from './constants'
import { mapToProduct } from './data-mapping'
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
let syncAbortController: AbortController | null = null

async function fetchAndCache(request: FetchEvent['request'], cache: Cache) {
  const networkResponse = await fetch(request)

  await cache.put(request, networkResponse.clone())
  await cache.put(`${request.url}-time`, new Response(Date.now().toString()))

  return networkResponse
}

function isStale(cachedDate: Date, currentDate: Date) {
  const ONE_HOUR = 1000 * 60 * 60
  return currentDate.getTime() - cachedDate.getTime() > ONE_HOUR
}

function notifyApp(message: AppMessage) {
  sw.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
    // console.log(`[SW] Notifying ${clients.length} clients:`, message.type)
    clients.forEach((client) => client.postMessage(message))
  })
}

async function runSupabaseSync() {
  console.log('[SW] runSupabaseSync started. isSyncing:', isSyncing)
  if (isSyncing) {
    return
  }

  const supabaseUrl = await db.getConfig(SUPABASE_URL_KEY)
  const supabaseKey = await db.getConfig(SUPABASE_ANON_KEY_KEY)

  if (!supabaseUrl || !supabaseKey) {
    console.error('[SW] Supabase credentials not found in IndexedDB. Sync aborted.')
    notifyApp({
      type: 'SYNC_ERROR',
      payload: { message: 'Supabase credentials missing. Please set them in Stats settings.' },
    })
    return
  }

  isSyncing = true
  syncAbortController = new AbortController()
  const signal = syncAbortController.signal

  syncProgress = { loaded: 0, total: 0, percent: 0 }

  try {
    console.log('[SW] Notifying app about SYNC_START')
    notifyApp({ type: 'SYNC_START' })

    // 1. Get total count using standard PostgREST HEAD request
    console.log('[SW] Fetching total count...')
    const countRes = await fetch(`${supabaseUrl}/rest/v1/active_products_snapshot?select=sku`, {
      method: 'HEAD',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'count=exact',
      },
    })

    const contentRange = countRes.headers.get('content-range')
    console.log('[SW] Content-Range:', contentRange)
    const totalCount = parseInt(contentRange?.split('/')?.[1] || '0')
    syncProgress.total = totalCount

    let from = 0
    while (true) {
      const url = `${supabaseUrl}/rest/v1/active_products_snapshot?select=sku,name,vendor,price,price_old,p2,stock,pics&order=sku.asc&offset=${from}&limit=${PAGE_SIZE}`
      const res = await fetch(url, {
        signal,
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      })

      const data = await res.json()
      if (!data || data.length === 0) {
        break
      }

      const products = data.map(mapToProduct)
      if (signal.aborted) {
        throw new Error('Sync aborted')
      }

      await db.saveProducts(products)

      syncProgress.loaded += data.length
      syncProgress.percent = totalCount > 0 ? Math.round((syncProgress.loaded / totalCount) * 100) : 0

      notifyApp({
        type: 'SYNC_PROGRESS',
        payload: syncProgress,
      })

      if (data.length < PAGE_SIZE) {
        break
      }
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
    if (error.name === 'AbortError' || error.message === 'Sync aborted') {
      console.log('[SW] Sync was aborted.')
      return
    }
    console.error('[SW] Sync error:', error)
    notifyApp({
      type: 'SYNC_ERROR',
      payload: { message: error.message || 'Unknown error' },
    })
  } finally {
    isSyncing = false
    syncProgress = null
    syncAbortController = null
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
    event.waitUntil(
      (async () => {
        console.log('[SW] Resetting cache and IndexedDB...')
        if (syncAbortController) {
          syncAbortController.abort()
        }
        await db.clearAll()
        await caches.delete(CACHE_NAME)

        console.log('[SW] Cache and DB cleared, notifying app...')
        notifyApp({ type: 'cache-reset-done' })
        // Re-trigger sync immediately to fill the gap
        console.log('[SW] Re-triggering sync after reset...')
        await runSupabaseSync()
      })(),
    )
  }

  if (message.type === 'push-me') {
    await sw.registration.showNotification(message.payload.title, message.payload.options)
  }
})

sw.addEventListener('fetch', (event) => {
  const {
    request: { url, method },
  } = event

  const response = (async () => {
    const supabaseUrl = await db.getConfig(SUPABASE_URL_KEY)

    if (method === 'GET' && supabaseUrl && url.includes(supabaseUrl)) {
      // For Supabase REST API calls, we might want to skip caching if they are part of the sync
      // but the app might still make individual calls.

      if (url.includes('/rest/v1/')) {
        // Individual Supabase REST calls can still be cached if not part of sync
      }

      const cache = await sw.caches.open(CACHE_NAME)
      const cachedResponse = await cache.match(event.request)

      if (cachedResponse) {
        const cachedTime = await cache.match(`${event.request.url}-time`)

        if (cachedTime) {
          const cachedDate = new Date(Number(await cachedTime.text()))
          const now = new Date()

          if (isStale(cachedDate, now)) {
            console.log('Cache is stale, fetching new data...')

            fetchAndCache(event.request, cache)
              .then(async (response) => {
                try {
                  const text = await response.clone().text()

                  if (url.includes(supabaseUrl)) {
                    try {
                      JSON.parse(text)
                    } catch {
                      //
                    }
                  }

                  console.log('Cache updated, app notified.')
                } catch (e) {
                  console.error('[SW] Error parsing background refreshed data:', e)
                }
              })
              .catch((err) => console.error('[SW] Background cache update failed:', err))
          } else {
            console.log('Cache is still valid, returning cached data.')
          }

          return cachedResponse
        }
      }

      console.log('No cache found, fetching new data...')
      return fetchAndCache(event.request, cache)
    }

    // Default fetch for non-supabase or missing config
    return fetch(event.request)
  })()

  event.respondWith(response)
})
