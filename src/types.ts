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
  note?: string
}

export type FavNotification = {
  title: string
  body: string
  favoriteId: string
  min?: number
  max?: number
  read?: boolean
  product: Product
}

export interface SearchForm {
  input: string
}

export type NotificationData = {
  sku: string
  to?: string
}

export type AppMessagePush = {
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
      type: 'cache-updated'
      payload: { count: number }
    }
  | {
      type: 'cache-reset-request'
    }
  | {
      type: 'cache-reset-done'
    }
  | {
      type: 'xxx'
    }

export type FavoriteItem = {
  favoriteId: string
  note?: string
  min?: number
  max?: number
  time: number
  read: boolean
}

export type Color = {
  color: string
  borderColor: string
  backgroundColor: string
}

export type VendorAndColors = { vendor: string } & Partial<Color>

export type CartItem = {
  itemId: string
  discount: string
  quantity: string
  cartId: string
}
