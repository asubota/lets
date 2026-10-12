export type IndexedProduct = Product & { __tokens: string[] }

export interface Product {
  sku: string
  name: string
  vendor: string
  price: number
  p2: number | null
  price_old: number | null
  stock: string | null
  pics: string[] | null
}

export interface FavoriteProduct extends Product {
  missed?: boolean
  time: number
  note?: string | undefined
}

export interface FavNotification {
  title: string
  body: string
  favoriteId: string
  min?: number | undefined
  max?: number | undefined
  read?: boolean | undefined
  product: Product
}

export interface SearchForm {
  input: string
}

export interface NotificationData {
  sku: string
  to?: string
}

export interface AppMessagePush {
  type: 'push-me'
  payload: {
    title: string
    options: NotificationOptions
  }
}

export type AppMessage =
  | AppMessagePush
  | {
      type: 'navigate'
      payload: NotificationData
    }
  | {
      type: 'cache-reset-request'
    }
  | {
      type: 'cache-reset-done'
    }
  | {
      type: 'SYNC_START'
    }
  | {
      type: 'SYNC_PROGRESS'
      payload: { loaded: number; total: number; percent: number }
    }
  | {
      type: 'SYNC_END'
      payload: { count: number }
    }
  | {
      type: 'SYNC_ERROR'
      payload: { message: string }
    }
  | {
      type: 'GET_SYNC_STATUS'
    }

export interface FavoriteItem {
  favoriteId: string
  note?: string
  min?: number
  max?: number
  time: number
  read: boolean
}

export interface Color {
  color: string
  borderColor: string
  backgroundColor: string
}

// A missing color means "not set" and clears the stored value
export type ColorPatch = { [K in keyof Color]?: Color[K] | undefined }

export type VendorColors = Record<string, ColorPatch>

export type VendorAndColors = { vendor: string } & ColorPatch

export interface CartItem {
  itemId: string
  discount: string
  quantity: string
  cartId: string
  created_at?: string
}
