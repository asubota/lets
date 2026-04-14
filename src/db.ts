import { type Product } from './types'

const DB_NAME = 'ShopDB'
const DB_VERSION = 3
const PRODUCTS_STORE = 'products'
const META_STORE = 'metadata'

// Singleton promise — prevents multiple concurrent openDB calls
let dbPromise: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) {
    return dbPromise
  }

  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (db.objectStoreNames.contains(PRODUCTS_STORE)) {
        db.deleteObjectStore(PRODUCTS_STORE)
      }
      db.createObjectStore(PRODUCTS_STORE, { keyPath: 'id' })
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: 'key' })
      }
    }

    request.onsuccess = () => {
      const db = request.result
      db.onversionchange = () => {
        db.close()
        dbPromise = null
      }
      resolve(db)
    }

    request.onblocked = () => console.warn('[DB] Blocked by another tab')
    request.onerror = () => {
      dbPromise = null
      reject(request.error)
    }
  })

  return dbPromise
}

function tx(db: IDBDatabase, stores: string | string[], mode: 'readonly' | 'readwrite' | 'versionchange'): IDBTransaction {
  return db.transaction(stores, mode)
}

function run<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function runTx(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}

export const db = {
  async saveProducts(products: Product[]): Promise<void> {
    const idb = await openDB()
    const transaction = tx(idb, PRODUCTS_STORE, 'readwrite')
    const store = transaction.objectStore(PRODUCTS_STORE)
    products.forEach((p) => store.put({ ...p, id: `${p.sku}-${p.vendor}` }))
    return runTx(transaction)
  },

  async getAllProducts(): Promise<Product[]> {
    const idb = await openDB()
    return run(tx(idb, PRODUCTS_STORE, 'readonly').objectStore(PRODUCTS_STORE).getAll())
  },

  async setSyncMetadata(data: { time: number; total: number }): Promise<void> {
    const idb = await openDB()
    const transaction = tx(idb, META_STORE, 'readwrite')
    transaction.objectStore(META_STORE).put({ key: 'last-sync', ...data })
    return runTx(transaction)
  },

  async getSyncMetadata(): Promise<{ key: 'last-sync'; time: number; total: number } | null> {
    const idb = await openDB()
    return run(tx(idb, META_STORE, 'readonly').objectStore(META_STORE).get('last-sync'))
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

  async clearAll(): Promise<void> {
    const idb = await openDB()
    const transaction = tx(idb, [PRODUCTS_STORE, META_STORE], 'readwrite')
    transaction.objectStore(PRODUCTS_STORE).clear()
    transaction.objectStore(META_STORE).clear()
    return runTx(transaction)
  },
}
