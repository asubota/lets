import { db } from './db'
import { type Product } from './types'

function isSyncStale(lastSyncTime: number) {
  const oneHour = 1000 * 60 * 60
  return Date.now() - lastSyncTime > oneHour
}

export const fetchProductsFromSupabase = async (): Promise<Product[]> => {
  const metadata = await db.getSyncMetadata()
  console.log('[Supabase API] Metadata:', metadata)

  const triggerWorkerSync = (type: string) => {
    const worker = navigator.serviceWorker.controller
    if (worker) {
      worker.postMessage({ type })
    } else {
      navigator.serviceWorker.ready.then((reg) => {
        const sw = reg.active || reg.waiting || reg.installing
        if (sw) {
          sw.postMessage({ type })
        }
      })
    }
  }

  // Notify SW to start sync if needed
  if (!metadata || isSyncStale(metadata.time)) {
    console.log('[Supabase API] Triggering sync...')
    triggerWorkerSync('SYNC_START')
  }

  // Request current status in case a sync is already running
  triggerWorkerSync('GET_SYNC_STATUS')

  // Return what we have in DB for now
  console.log('[Supabase API] Fetching products from DB...')
  const products = await db.getAllProducts()
  console.log(`[Supabase API] Loaded ${products.length} products from DB`)
  return products
}
