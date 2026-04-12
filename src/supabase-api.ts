import { db } from './db'
import { Product } from './types'

export type FetchProgress = {
  loaded: number
  total: number
  percent: number
}

function isSyncStale(lastSyncTime: number) {
  const oneHour = 1000 * 60 * 60
  return Date.now() - lastSyncTime > oneHour
}

export const fetchProductsFromSupabase = async (): Promise<Product[]> => {
  const metadata = await db.getSyncMetadata()
  console.log('[Supabase API] Metadata:', metadata)

  // Notify SW to start sync if needed
  if (!metadata || isSyncStale(metadata.time)) {
    console.log('[Supabase API] Triggering sync...')
    navigator.serviceWorker.ready.then((reg) => {
      const worker = reg.active || reg.waiting || reg.installing
      if (worker) {
        console.log(`[Supabase API] Sending SYNC_START to worker status: ${worker.state}`)
        worker.postMessage({ type: 'SYNC_START' })
      } else {
        console.warn('[Supabase API] No active SW worker found')
      }
    })
  }

  // Request current status in case a sync is already running
  navigator.serviceWorker.ready.then((reg) => {
    const worker = reg.active || reg.waiting || reg.installing
    worker?.postMessage({ type: 'GET_SYNC_STATUS' })
  })

  // Return what we have in DB for now
  console.log('[Supabase API] Fetching products from DB...')
  const products = await db.getAllProducts()
  console.log(`[Supabase API] Loaded ${products.length} products from DB`)
  return products
}
