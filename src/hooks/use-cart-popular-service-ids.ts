import { useCartItems } from './use-cart-items.ts'
import { POPULAR_SERViCE_PREFIX } from '../constants.ts'
import { type CartItem } from '../types.ts'

const filterPopular = (item: CartItem): boolean => {
  return !!item.itemId && item.itemId.startsWith(POPULAR_SERViCE_PREFIX)
}

export const useCartPopularServiceIds = () => {
  const data = useCartItems()

  return data.filter((item) => filterPopular(item)).map((item) => item.itemId)
}
