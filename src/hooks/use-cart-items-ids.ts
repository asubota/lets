import { useCartItems } from './use-cart-items.ts'

export const useCartItemsIds = () => {
  const data = useCartItems()

  return data.map((item) => item.itemId)
}
