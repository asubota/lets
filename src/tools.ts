import { STORAGE_KEY } from './constants.ts'

export interface Product {
  CreatedAt: string
  Id: number
  UpdatedAt: null
  Артикул: string
  Назва: string
  Наявність: string
  Продавець: string
  Ціна: string
}

export const filterBySearch = (item: Product, search: string): boolean => {
  return (
    item['Артикул'].toLowerCase().includes(search.toLowerCase()) ||
    item['Назва'].toLowerCase().includes(search.toLowerCase())
  )
}

export const findData = (search: string): Product[] => {
  if (!search || search.length < 3) {
    return []
  }

  const value = localStorage.getItem(STORAGE_KEY)

  if (!value) {
    return []
  }

  const data: Product[] = JSON.parse(value)

  if (!Array.isArray(data)) {
    return []
  }

  return data.filter((item) => {
    return (
      item['Артикул'].toLowerCase().includes(search.toLowerCase()) ||
      item['Назва'].toLowerCase().includes(search.toLowerCase())
    )
  })
}
