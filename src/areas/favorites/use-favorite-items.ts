import { FavoriteProduct } from '../../types.ts'
import { useGetFavorites } from '../../api.ts'
import { useMemo } from 'react'
import { useAllData } from '../../use-data.ts'
import { compareByTime, getFavoriteId } from '../../tools.tsx'
import { DUMMY_VENDOR } from '../../constants.ts'
import { setProp } from '../../google-api.ts'

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

    if (products.length === 0) {
      return result
    }

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

        const missedProduct: FavoriteProduct = {
          sku,
          vendor,
          name: '-',
          price: 0,
          p2: 0,
          pics: null,
          link: null,
          stock: '0',
          missed: true,
          time: favoriteItem.time,
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

    return result.sort(compareByTime).reverse()
  }, [byId, products, favoriteItems])
}
