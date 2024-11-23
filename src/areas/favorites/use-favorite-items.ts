import { FavoriteProduct } from '../../types.ts'
import { useGetFavorites } from '../../api.ts'
import { useMemo } from 'react'
import { useAllData } from '../../use-data.ts'
import {
  compareByNoteAndTime,
  compareByTime,
  getFavoriteId,
} from '../../tools.tsx'
import { DUMMY_VENDOR } from '../../constants.ts'
import { setProp } from '../../google-api.ts'
import { useAppSort } from '../../store'

export const useFavoriteItems = (): FavoriteProduct[] => {
  const { data: favoriteItems = [] } = useGetFavorites()
  const products = useAllData()
  const sort = useAppSort()

  const byId = useMemo(
    () => new Map(favoriteItems.map((item) => [item.favoriteId, item])),
    [favoriteItems],
  )

  return useMemo(() => {
    const result: FavoriteProduct[] = []
    const existingKeys = new Set<string>()

    if (products.length === 0) {
      return result
    }

    products.forEach((item) => {
      const favoriteId = getFavoriteId(item)

      if (byId.has(favoriteId)) {
        result.push({
          ...item,
          time: byId.get(favoriteId)?.time || 0,
          note: byId.get(favoriteId)?.note,
        })
        existingKeys.add(favoriteId)
      }
    })

    favoriteItems.forEach((favoriteItem) => {
      if (!existingKeys.has(favoriteItem.favoriteId)) {
        const [sku, vendor] = favoriteItem.favoriteId.split(':')

        const missedProduct: FavoriteProduct = {
          sku,
          vendor,
          name: '-',
          price: 0,
          p2: 0,
          pics: null,
          stock: '0',
          missed: true,
          time: favoriteItem.time,
          note: favoriteItem.note,
        }

        if (vendor === DUMMY_VENDOR) {
          const lowerSku = sku.toLowerCase()
          const product = products.find(
            (p) => p.sku.toLowerCase() === lowerSku && p.vendor !== 'base',
          )

          if (product) {
            missedProduct.vendor = product.vendor
            setProp(
              favoriteItem.favoriteId,
              'favoriteId',
              getFavoriteId(product),
            )
          }
        }

        result.push(missedProduct)
      }
    })

    const sortFn = sort === 'date' ? compareByTime : compareByNoteAndTime
    return result.sort(sortFn)
  }, [byId, products, favoriteItems, sort])
}
