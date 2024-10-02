import { useGetFavorites } from '../api.ts'

export type MinMax = Record<string, { min?: number; max?: number }>

export const useGetMinMaxBySku = () => {
  const { data = [] } = useGetFavorites()

  return data
    .filter((item) => item.min || item.max)
    .reduce((acc, item) => {
      const sku = item.favoriteId.split(':')[0]
      return { ...acc, [sku]: { min: item.min, max: item.max } }
    }, {} as MinMax)
}
