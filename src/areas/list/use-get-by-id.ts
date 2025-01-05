import { useAllData } from '../../use-data.ts'
import { Product } from '../../types.ts'

export const useGetById = (id: string): Product | undefined => {
  const data = useAllData()

  const [sku, vendor] = id.split(':')
  return data.find((p) => p.sku === sku && p.vendor === vendor)
}
