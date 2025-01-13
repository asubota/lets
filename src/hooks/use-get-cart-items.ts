import { useGetCart } from '../cart-api.ts'

export const useGetCartItems = () => {
  const { data = [] } = useGetCart()

  return data.map((item) => {
    return item.itemId
  })
}
