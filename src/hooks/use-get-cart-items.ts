import { useGetCart } from '../cart-api.ts'

export const useGetCartItems = () => {
  const { data = [] } = useGetCart()

  return data.map((item) => {
    return item.itemId
  })
}

export const useGetCurrentCartServiceItems = () => {
  const { data = [] } = useGetCart()

  return data
    .filter((item) => {
      return !!item.itemId && item.itemId.includes('$__')
    })
    .map((item) => item.itemId)
}
