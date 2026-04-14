import { SUPABASE_ANON_KEY_KEY, SUPABASE_URL_KEY } from './constants'
import { mapToProduct } from './data-mapping'
import { db } from './db'
import { type AppMessage, type NotificationData } from './types'

const PAGE_SIZE = 500

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

function notifyApp(message: AppMessage) {
  sw.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => client.postMessage(message))
  })
}

async function runSupabaseSync() {
  console.log('[SW] runSupabaseSync started. isSyncing:', isSyncing)
  if (isSyncing) {
    return
  }

  console.log('[SW] runSupabaseSync started. Loading config from DB...')
  
  const [supabaseUrl, supabaseKey] = await Promise.all([
    db.getConfig(SUPABASE_URL_KEY),
    db.getConfig(SUPABASE_ANON_KEY_KEY),
  ]).then(res => res.map(v => v?.trim()))

  console.log(`[SW] Config loaded: URL=${Boolean(supabaseUrl)}, KEY=${Boolean(supabaseKey)}`)

  if (!supabaseUrl || !supabaseKey) {
    const missing = !supabaseUrl ? 'URL' : 'KEY'
    console.error(`[SW] Supabase ${missing} not found in IndexedDB. Sync aborted.`)
    notifyApp({
      type: 'SYNC_ERROR',
      payload: { message: `Supabase ${missing} missing. Please set it in Stats settings.` },
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
        console.log('[SW] Resetting IndexedDB...')
        syncAbortController?.abort()
        await db.clearAll()
        notifyApp({ type: 'cache-reset-done' })
        console.log('[SW] DB cleared, re-triggering sync...')
        await runSupabaseSync()
      })(),
    )
  }
  if (message.type === 'push-me') {
    await sw.registration.showNotification(message.payload.title, message.payload.options)
  }
})
