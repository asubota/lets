export interface Product {
  sku: string
  name: string
  vendor: string
  price: number
  p2: number | null
  stock: string | null
  link: string | null
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
  sku: string
  favoriteId: string
  min?: number
  max?: number
  read?: boolean
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
      type: 'cache-update'
      payload: { count: number }
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
