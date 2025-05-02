import { findProduct } from '../../tools.tsx'
import { type Product } from '../../types.ts'
import { useAllData } from '../../use-data.ts'

export const useGetById = (id: string): Product | undefined => {
  const data = useAllData()

  return findProduct(id, data)
}
