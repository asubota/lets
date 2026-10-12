import { db } from './db'
import { type Product } from './types'

const SYNC_STALE_MS = 1000 * 60 * 60 // 1 hour

function isSyncStale(lastSyncTime: number) {
  return Date.now() - lastSyncTime > SYNC_STALE_MS
}

async function postToServiceWorker(type: string) {
  const worker = navigator.serviceWorker.controller
  if (worker) {
    worker.postMessage({ type })
  } else {
    const registration = await navigator.serviceWorker.ready
    const sw = registration.active ?? registration.waiting ?? registration.installing
    sw?.postMessage({ type })
  }
}

export const fetchProductsFromSupabase = async (): Promise<Product[]> => {
  const metadata = await db.getSyncMetadata()

  if (!metadata || isSyncStale(metadata.time)) {
    // Sync is stale — ask SW to start sync.
    // SW will also send back SYNC_PROGRESS if already running.
    void postToServiceWorker('SYNC_START')
  } else {
    // Data is fresh, but check if a sync is already in progress
    // (e.g., page was refreshed mid-sync)
    void postToServiceWorker('GET_SYNC_STATUS')
  }

  return db.getAllProducts()
}
