import { Product } from '../../types.ts'
import { useFavoriteIds } from '../../api.ts'
import { useMemo } from 'react'
import { useAllData } from '../../use-data.ts'
import { getFavoriteId } from '../../tools.tsx'

export const useFavoriteItems = (): Product[] => {
  const favoriteIds = useFavoriteIds()
  const products = useAllData()
  const favsSet = useMemo(() => new Set(favoriteIds), [favoriteIds])

  return useMemo(() => {
    const existingItems: Product[] = []
    const missingItems: Product[] = []
    const existingKeys = new Set<string>()

    products.forEach((item) => {
      const key = getFavoriteId(item)
      if (favsSet.has(key)) {
        existingItems.push(item)
        existingKeys.add(key)
      }
    })

    favoriteIds.forEach((favoriteId) => {
      if (!existingKeys.has(favoriteId)) {
        const [sku, vendor] = favoriteId.split(':')
        missingItems.push({
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
        })
      }
    })

    return [...missingItems, ...existingItems]
  }, [favsSet, products, favoriteIds])
}
