export interface Product {
  sku: string
  name: string
  availability: string
  vendor: string
  price: string | number
  stock: string | null
  link: string | null
  pics: string[] | null
}
