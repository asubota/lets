import { useCartItems } from './use-cart-items.ts'
import { POPULAR_SERViCE_PREFIX } from '../constants.ts'
import { CartItem } from '../types.ts'

const filterPopular = (item: CartItem): boolean => {
  return !!item.itemId && item.itemId.startsWith(POPULAR_SERViCE_PREFIX)
}

export const useCartPopularServiceIds = () => {
  const data = useCartItems()

  return data.filter(filterPopular).map((item) => item.itemId)
}
