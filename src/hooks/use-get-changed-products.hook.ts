import { useMemo } from 'react'

import { useAllData } from '../use-data.ts'
import { useGetMinMaxBySku } from './use-get-min-max-by-sku.ts'
import { type Product } from '../types.ts'

export const useGetChangedProducts = (): Product[] => {
  const data = useAllData()
  const minmax = useGetMinMaxBySku()

  return useMemo(() => {
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
}
