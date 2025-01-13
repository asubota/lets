import { useGetCartItems } from './use-get-cart-items.ts'

export const useCartItemsCount = () => {
  return useGetCartItems().length
}
