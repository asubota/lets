import { SUPABASE_ANON_KEY_KEY, SUPABASE_URL_KEY } from './constants'
import { mapToProduct } from './data-mapping'
import { db } from './db'
import { type AppMessage, type NotificationData } from './types'

const PAGE_SIZE = 500

const sw = globalThis as unknown as ServiceWorkerGlobalScope

console.log('[SW] Service Worker script loaded. Version: 1.0.2')

sw.addEventListener('install', () => {
  console.log('[SW] Install event')
  void sw.skipWaiting()
})

sw.addEventListener('activate', (event) => {
  console.log('[SW] Activate event')
  event.waitUntil(sw.clients.claim())
})

let syncProgress: { loaded: number; total: number; percent: number } | null = null
let isSyncing = false
let syncAbortController: AbortController | null = null

async function notifyApp(message: AppMessage) {
  const clients = await sw.clients.matchAll({ type: 'window', includeUncontrolled: true })
  for (const client of clients) {
    client.postMessage(message)
  }
}

async function fetchPage(supabaseUrl: string, supabaseKey: string, from: number, signal: AbortSignal) {
  const url = `${supabaseUrl}/rest/v1/active_products_snapshot?select=sku,name,vendor,price,price_old,p2,stock,pics&order=sku.asc&offset=${from}&limit=${PAGE_SIZE}`
  const response = await fetch(url, {
    signal,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  })

  return (await response.json()) as Record<string, unknown>[] | null
}

// Get total count using standard PostgREST HEAD request
async function fetchTotalCount(supabaseUrl: string, supabaseKey: string, signal: AbortSignal) {
  console.log('[SW] Fetching total count...')
  const countResponse = await fetch(`${supabaseUrl}/rest/v1/active_products_snapshot?select=sku`, {
    method: 'HEAD',
    signal,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: 'count=exact',
    },
  })

  const contentRange = countResponse.headers.get('content-range')
  console.log('[SW] Content-Range:', contentRange)
  return Number.parseInt(contentRange?.split('/', 2)[1] ?? '0')
}

async function loadConfig() {
  const [supabaseUrl, supabaseKey] = await Promise.all([
    db.getConfig(SUPABASE_URL_KEY),
    db.getConfig(SUPABASE_ANON_KEY_KEY),
  ])
  return { supabaseUrl: supabaseUrl?.trim(), supabaseKey: supabaseKey?.trim() }
}

const isAbortError = (error: unknown) =>
  error instanceof Error && (error.name === 'AbortError' || error.message === 'Sync aborted')

async function syncPages(
  supabaseUrl: string,
  supabaseKey: string,
  signal: AbortSignal,
  progress: NonNullable<typeof syncProgress>,
) {
  let from = 0
  for (;;) {
    const data = await fetchPage(supabaseUrl, supabaseKey, from, signal)
    if (!data || data.length === 0) {
      break
    }

    const products = data.map((item) => mapToProduct(item))
    if (signal.aborted) {
      throw new Error('Sync aborted')
    }

    await db.saveProducts(products)

    progress.loaded += data.length
    progress.percent = progress.total > 0 ? Math.round((progress.loaded / progress.total) * 100) : 0

    await notifyApp({
      type: 'SYNC_PROGRESS',
      payload: progress,
    })

    if (data.length < PAGE_SIZE) {
      break
    }
    from += PAGE_SIZE

    // Small delay to prevent rate limiting
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
}

async function runSupabaseSync() {
  console.log('[SW] runSupabaseSync started. isSyncing:', isSyncing)
  if (isSyncing) {
    return
  }

  console.log('[SW] runSupabaseSync started. Loading config from DB...')

  const { supabaseUrl, supabaseKey } = await loadConfig()

  console.log(`[SW] Config loaded: URL=${Boolean(supabaseUrl)}, KEY=${Boolean(supabaseKey)}`)

  if (!supabaseUrl || !supabaseKey) {
    const missing = supabaseUrl ? 'KEY' : 'URL'
    console.error(`[SW] Supabase ${missing} not found in IndexedDB. Sync aborted.`)
    await notifyApp({
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
    await notifyApp({ type: 'SYNC_START' })

    const totalCount = await fetchTotalCount(supabaseUrl, supabaseKey, signal)
    syncProgress.total = totalCount

    await syncPages(supabaseUrl, supabaseKey, signal, syncProgress)

    await db.setSyncMetadata({
      time: Date.now(),
      total: totalCount,
    })

    await notifyApp({
      type: 'SYNC_END',
      payload: { count: syncProgress.loaded },
    })
  } catch (error: unknown) {
    if (isAbortError(error)) {
      console.log('[SW] Sync was aborted.')
      return
    }
    console.error('[SW] Sync error:', error)
    await notifyApp({
      type: 'SYNC_ERROR',
      payload: { message: (error instanceof Error && error.message) || 'Unknown error' },
    })
  } finally {
    isSyncing = false
    syncProgress = null
    syncAbortController = null
  }
}

sw.addEventListener('notificationclick', (event) => {
  const data = event.notification.data as NotificationData

  const doNavigation = async () => {
    const windowClients = await sw.clients.matchAll({ type: 'window', includeUncontrolled: true })
    const focusedClient = windowClients.find((client) => client.focused)

    if (focusedClient) {
      const message: AppMessage = { type: 'navigate', payload: data }
      focusedClient.postMessage(message)
    } else {
      await sw.clients.openWindow('/lets/')
    }
    event.notification.close()
  }

  event.waitUntil(doNavigation())
})

sw.addEventListener('message', (event) => {
  const message = event.data as AppMessage
  console.log('[SW] Received message:', message.type)

  if (message.type === 'SYNC_START') {
    console.log('[SW] Handling SYNC_START')
    event.waitUntil(runSupabaseSync())
  }

  if (message.type === 'GET_SYNC_STATUS' && isSyncing && syncProgress) {
    event.waitUntil(
      notifyApp({
        type: 'SYNC_PROGRESS',
        payload: syncProgress,
      }),
    )
  }

  if (message.type === 'cache-reset-request') {
    event.waitUntil(
      (async () => {
        // Abort any in-flight sync and immediately reset state so isSyncing is
        // false before we call runSupabaseSync() — without this there is a race
        // where the finally-block of the aborted sync hasn't run yet.
        syncAbortController?.abort()
        isSyncing = false
        syncProgress = null
        syncAbortController = null

        console.log('[SW] Resetting products cache...')
        await db.clearProductsAndSyncMeta()
        await notifyApp({ type: 'cache-reset-done' })
        console.log('[SW] DB cleared, re-triggering sync...')
        await runSupabaseSync()
      })(),
    )
  }
  if (message.type === 'push-me') {
    event.waitUntil(sw.registration.showNotification(message.payload.title, message.payload.options))
  }
})
