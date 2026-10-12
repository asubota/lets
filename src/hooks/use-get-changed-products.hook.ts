import { useMemo } from 'react'

import { useAllData } from '../use-data.ts'
import { useGetMinMaxBySku } from './use-get-min-max-by-sku.ts'
import { type Product } from '../types.ts'

export const useGetChangedProducts = (): Product[] => {
  const data = useAllData()
  const minmax = useGetMinMaxBySku()

  return useMemo(() => {
    return data.filter((p) => {
      const limits = minmax[p.sku]
      if (!limits || !p.stock) {
        return false
      }

      const stock = Number.parseInt(p.stock, 10)
      const { min, max } = limits

      return (min !== undefined && stock <= min) || (max !== undefined && stock >= max)
    })
  }, [data, minmax])
}
