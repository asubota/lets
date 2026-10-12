import { useGetFavorites } from '../api.ts'

export type MinMax = Record<string, { min?: number | undefined; max?: number | undefined; read: boolean }>

export const useGetMinMaxBySku = (): MinMax => {
  const { data = [] } = useGetFavorites()
  const result: MinMax = {}

  for (const item of data) {
    const [sku] = item.favoriteId.split(':', 1)
    if (sku !== undefined && (item.min !== undefined || item.max !== undefined)) {
      result[sku] = { min: item.min, max: item.max, read: item.read }
    }
  }

  return result
}
