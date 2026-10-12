import { useMemo } from 'react'

import { useGetFavorites } from '../../api.ts'
import { DUMMY_VENDOR } from '../../constants.ts'
import { useAppSort } from '../../store'
import { updateFavoriteId } from '../../supabase-api-favorites.ts'
import { compareByNoteAndTime, compareByTime, getFavoriteId } from '../../tools.tsx'
import { type FavoriteProduct } from '../../types.ts'
import { useAllData } from '../../use-data.ts'

export const useFavoriteItems = (): FavoriteProduct[] => {
  const { data: favoriteItems = [] } = useGetFavorites()
  const products = useAllData()
  const sort = useAppSort()

  const byId = useMemo(() => new Map(favoriteItems.map((item) => [item.favoriteId, item])), [favoriteItems])

  return useMemo(() => {
    const result: FavoriteProduct[] = []
    const existingKeys = new Set<string>()

    if (products.length === 0) {
      return result
    }

    for (const item of products) {
      const favoriteId = getFavoriteId(item)

      if (byId.has(favoriteId)) {
        result.push({
          ...item,
          time: byId.get(favoriteId)?.time ?? 0,
          note: byId.get(favoriteId)?.note,
        })
        existingKeys.add(favoriteId)
      }
    }

    for (const favoriteItem of favoriteItems) {
      if (!existingKeys.has(favoriteItem.favoriteId)) {
        const [sku = '', vendor = ''] = favoriteItem.favoriteId.split(':')

        const missedProduct: FavoriteProduct = {
          sku,
          vendor,
          name: '-',
          price: 0,
          price_old: 0,
          p2: 0,
          pics: null,
          stock: '0',
          missed: true,
          time: favoriteItem.time,
          note: favoriteItem.note,
        }

        if (vendor === DUMMY_VENDOR) {
          const lowerSku = sku.toLowerCase()
          const product = products.find((p) => p.sku.toLowerCase() === lowerSku && p.vendor !== 'base')

          if (product) {
            missedProduct.vendor = product.vendor
            void updateFavoriteId(favoriteItem.favoriteId, getFavoriteId(product))
          }
        }

        result.push(missedProduct)
      }
    }

    const sortFunction = sort === 'date' ? compareByTime : compareByNoteAndTime
    return result.toSorted(sortFunction)
  }, [byId, products, favoriteItems, sort])
}
