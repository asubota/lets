import { type Product } from './types'

const DB_NAME = 'ShopDB'
const DB_VERSION = 4
const PRODUCTS_STORE = 'products'
const META_STORE = 'metadata'

// Singleton promise — prevents multiple concurrent openDB calls
let databasePromise: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (databasePromise) {
    return databasePromise
  }

  databasePromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result
      const tx = (event.target as IDBOpenDBRequest).transaction

      if (database.objectStoreNames.contains(PRODUCTS_STORE)) {
        database.deleteObjectStore(PRODUCTS_STORE)
      }
      database.createObjectStore(PRODUCTS_STORE, { keyPath: 'id' })

      if (!database.objectStoreNames.contains(META_STORE)) {
        database.createObjectStore(META_STORE, { keyPath: 'key' })
      } else if (tx) {
        tx.objectStore(META_STORE).delete('last-sync')
      }
    }

    request.onsuccess = () => {
      const database = request.result
      database.onversionchange = () => {
        database.close()
        databasePromise = null
      }
      resolve(database)
    }

    request.onblocked = () => {
      console.warn('[DB] Blocked by another tab')
    }
    request.addEventListener('error', () => {
      databasePromise = null
      reject(request.error ?? new Error('[DB] Failed to open'))
    })
  })

  return databasePromise
}

function tx(
  database: IDBDatabase,
  stores: string | string[],
  mode: 'readonly' | 'readwrite' | 'versionchange',
): IDBTransaction {
  return database.transaction(stores, mode)
}

function run<T>(req: IDBRequest): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => {
      resolve(req.result as T)
    }
    req.addEventListener('error', () => {
      reject(req.error ?? new Error('[DB] Request failed'))
    })
  })
}

function runTx(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve()
    }
    transaction.addEventListener('error', () => {
      reject(transaction.error ?? new Error('[DB] Transaction failed'))
    })
  })
}

export const db = {
  async saveProducts(products: Product[]): Promise<void> {
    const idb = await openDB()
    const transaction = tx(idb, PRODUCTS_STORE, 'readwrite')
    const store = transaction.objectStore(PRODUCTS_STORE)
    for (const p of products) {
      const vendorPrefix = p.vendor === 'base' ? '0' : '1'
      store.put({ ...p, id: `${vendorPrefix}-${p.sku}-${p.vendor}` })
    }
    return runTx(transaction)
  },

  async getAllProducts(): Promise<Product[]> {
    const idb = await openDB()
    return run<Product[]>(tx(idb, PRODUCTS_STORE, 'readonly').objectStore(PRODUCTS_STORE).getAll())
  },

  async setSyncMetadata(data: { time: number; total: number }): Promise<void> {
    const idb = await openDB()
    const transaction = tx(idb, META_STORE, 'readwrite')
    transaction.objectStore(META_STORE).put({ key: 'last-sync', ...data })
    return runTx(transaction)
  },

  async getSyncMetadata(): Promise<{ key: 'last-sync'; time: number; total: number } | null> {
    const idb = await openDB()
    const record = await run<{ key: 'last-sync'; time: number; total: number } | undefined>(
      tx(idb, META_STORE, 'readonly').objectStore(META_STORE).get('last-sync'),
    )
    return record ?? null
  },

  async setConfig(key: string, value: string): Promise<void> {
    const idb = await openDB()
    const transaction = tx(idb, META_STORE, 'readwrite')
    transaction.objectStore(META_STORE).put({ key, value })
    return runTx(transaction)
  },

  async getConfig(key: string): Promise<string | null> {
    const idb = await openDB()
    const record = await run<{ key: string; value: string } | undefined>(
      tx(idb, META_STORE, 'readonly').objectStore(META_STORE).get(key),
    )
    return record?.value ?? null
  },

  /** Cache reset: clears products + last-sync timestamp, but keeps config (Supabase URL/key). */
  async clearProductsAndSyncMeta(): Promise<void> {
    const idb = await openDB()
    const transaction = tx(idb, [PRODUCTS_STORE, META_STORE], 'readwrite')
    transaction.objectStore(PRODUCTS_STORE).clear()
    transaction.objectStore(META_STORE).delete('last-sync')
    return runTx(transaction)
  },
}
