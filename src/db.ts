import { type Product } from './types'

const DB_NAME = 'ShopDB'
const PRODUCTS_STORE = 'products'
const META_STORE = 'metadata'
const DB_VERSION = 3

export interface SyncMetadata {
  key: string
  [key: string]: any
}

export class ShopDB {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (this.db) {
      return
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onupgradeneeded = (event) => {
        console.log('[DB] Upgrade needed')
        const db = (event.target as IDBOpenDBRequest).result
        // Recreate PRODUCTS_STORE with compound key (sku + vendor)
        if (db.objectStoreNames.contains(PRODUCTS_STORE)) {
          db.deleteObjectStore(PRODUCTS_STORE)
        }
        db.createObjectStore(PRODUCTS_STORE, { keyPath: 'id' })
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: 'key' })
        }
      }

      request.onsuccess = () => {
        console.log('[DB] Success')
        this.db = request.result
        this.db.onversionchange = () => {
          this.db?.close()
          this.db = null
          console.log('[DB] Version change, closed connection')
        }
        resolve()
      }

      request.onblocked = () => {
        console.warn('[DB] Blocked by another tab')
      }

      request.onerror = () => {
        console.error('[DB] Error', request.error)
        reject(request.error)
      }
    })
  }

  async saveProducts(products: Product[]): Promise<void> {
    await this.init()
    if (!this.db) {
      throw new Error('DB not initialized')
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PRODUCTS_STORE], 'readwrite')
      const store = tx.objectStore(PRODUCTS_STORE)

      // Compound key: sku + vendor to support same article from different vendors
      products.forEach((p) => store.put({ ...p, id: `${p.sku}-${p.vendor}` }))

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getAllProducts(): Promise<Product[]> {
    await this.init()
    if (!this.db) {
      throw new Error('DB not initialized')
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PRODUCTS_STORE], 'readonly')
      const store = tx.objectStore(PRODUCTS_STORE)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async setSyncMetadata(metadata: Omit<SyncMetadata, 'key'>): Promise<void> {
    await this.init()
    if (!this.db) {
      throw new Error('DB not initialized')
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([META_STORE], 'readwrite')
      const store = tx.objectStore(META_STORE)
      store.put({ key: 'last-sync', ...metadata })

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getSyncMetadata(): Promise<{ key: 'last-sync'; time: number; total: number } | null> {
    await this.init()
    if (!this.db) {
      throw new Error('DB not initialized')
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([META_STORE], 'readonly')
      const store = tx.objectStore(META_STORE)
      const request = store.get('last-sync')

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async setConfig(key: string, value: string): Promise<void> {
    await this.init()
    if (!this.db) {
      throw new Error('DB not initialized')
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([META_STORE], 'readwrite')
      const store = tx.objectStore(META_STORE)
      store.put({ key, value })

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getConfig(key: string): Promise<string | null> {
    await this.init()
    if (!this.db) {
      throw new Error('DB not initialized')
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([META_STORE], 'readonly')
      const store = tx.objectStore(META_STORE)
      const request = store.get(key)

      request.onsuccess = () => resolve(request.result?.value || null)
      request.onerror = () => reject(request.error)
    })
  }

  async clearAll(): Promise<void> {
    await this.init()
    if (!this.db) {
      throw new Error('DB not initialized')
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([PRODUCTS_STORE, META_STORE], 'readwrite')
      tx.objectStore(PRODUCTS_STORE).clear()
      tx.objectStore(META_STORE).clear()

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }
}

export const db = new ShopDB()
