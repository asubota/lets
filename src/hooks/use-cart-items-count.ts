import { useCartItems } from './use-cart-items.ts'

export const useCartItemsCount = () => {
  return useCartItems().length
}
