import { useAllData } from '../../use-data.ts'
import { Product } from '../../types.ts'
import { findProduct } from '../../tools.tsx'

export const useGetById = (id: string): Product | undefined => {
  const data = useAllData()

  return findProduct(id, data)
}
