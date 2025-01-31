import { useGetCart } from '../cart-api.ts'

export const useCartItems = () => {
  const { data = [] } = useGetCart()

  return data
}
