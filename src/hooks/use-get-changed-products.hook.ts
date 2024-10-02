import { useAllData } from '../use-data.ts'
import { useMemo } from 'react'
import { useGetMinMaxBySku } from './use-get-min-max-by-sku.ts'

export const useGetChangedProducts = () => {
  const data = useAllData()
  const minmax = useGetMinMaxBySku()

  const items = useMemo(() => {
    return data
      .filter((p) => p.sku in minmax && !!p.stock)
      .filter((p) => {
        const stock = parseInt(p.stock || '', 10)
        const min = minmax[p.sku].min
        const max = minmax[p.sku].max

        if (
          (min !== undefined && stock <= min) ||
          (max !== undefined && stock >= max)
        ) {
          return p
        }
      })
  }, [data, minmax])

  const skus = items.map((item) => item.sku)

  return { items, skus }
}
