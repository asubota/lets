import { FavoriteProduct } from '../../types.ts'
import { useGetFavorites } from '../../api.ts'
import { useMemo } from 'react'
import { useAllData } from '../../use-data.ts'
import { compareByTime, getFavoriteId } from '../../tools.tsx'

export const useFavoriteItems = (): FavoriteProduct[] => {
  const { data: favoriteItems = [] } = useGetFavorites()
  const products = useAllData()

  const byId = useMemo(
    () => new Map(favoriteItems.map((item) => [item.favoriteId, item])),
    [favoriteItems],
  )

  return useMemo(() => {
    const result: FavoriteProduct[] = []
    const existingKeys = new Set<string>()

    products.forEach((item) => {
      const favoriteId = getFavoriteId(item)

      if (byId.has(favoriteId)) {
        result.push({ ...item, time: byId.get(favoriteId)?.time || 0 })

        existingKeys.add(favoriteId)
      }
    })

    favoriteItems.forEach((favoriteItem) => {
      if (!existingKeys.has(favoriteItem.favoriteId)) {
        const [sku, vendor] = favoriteItem.favoriteId.split(':')
        result.push({
          sku,
          vendor,
          name: '-',
          price: 0,
          p2: 0,
          pics: null,
          link: null,
          availability: '',
          stock: '0',
          missed: true,
          time: favoriteItem.time,
        })
      }
    })

    return result.sort(compareByTime).reverse()
  }, [byId, products, favoriteItems])
}
