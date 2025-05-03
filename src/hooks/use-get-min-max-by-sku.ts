import { useGetFavorites } from '../api.ts'

export type MinMax = Record<
  string,
  { min?: number; max?: number; read: boolean }
>

export const useGetMinMaxBySku = (): MinMax => {
  const { data = [] } = useGetFavorites()

  return data
    .filter((item) => item.min !== undefined || item.max !== undefined)
    .reduce((acc, item) => {
      const sku = item.favoriteId.split(':')[0]
      return {
        ...acc,
        [sku]: { min: item.min, max: item.max, read: item.read },
      }
    }, {} as MinMax)
}
