export interface Product {
  sku: string
  name: string
  availability: string
  vendor: string
  price: number
  p2: number | null
  stock: string | null
  link: string | null
  pics: string[] | null

  missed?: boolean
}

export interface SearchForm {
  input: string
}

export type NotificationData = {
  sku: string
}

export type AppMessage =
  | {
      type: 'push-me'
      payload: {
        title: string
        options: NotificationOptions
      }
    }
  | {
      type: 'navigate'
      payload: NotificationData
    }
  | {
      type: 'cache-update'
    }
