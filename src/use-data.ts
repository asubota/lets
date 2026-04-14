import { useQuery } from '@tanstack/react-query'

import { CACHE_BASE_KEY, POPULAR_SERViCE_PREFIX } from './constants'
import { buildItemTokens } from './search-tools'
import { type Meta, useAppActions } from './store'
import { fetchProductsFromSupabase } from './supabase-api'
import { getUniqueVendors } from './tools.tsx'
import { type IndexedProduct, type Product } from './types'

const isMeta = (p: Product) => p.sku === '__meta__'
const isNotMeta = (p: Product) => p.sku !== '__meta__'

const getData = async (setMeta: (data: Meta) => void): Promise<IndexedProduct[]> => {
  const products: Product[] = await fetchProductsFromSupabase()

  const meta = products.find(isMeta)

  if (meta) {
    try {
      setMeta(JSON.parse(meta.name))
    } catch {
      //
    }
  }

  return products.filter(isNotMeta).map((p: Product) => {
    return { ...p, __tokens: buildItemTokens(p) }
  })
}

export const useData = () => {
  const { setMeta } = useAppActions()
  return useQuery<IndexedProduct[]>({
    // staleTime: 0,
    staleTime: 1000 * 60 * 15, // 1 minute
    refetchOnWindowFocus: 'always',
    queryKey: [CACHE_BASE_KEY],
    queryFn: () => getData(setMeta),
  })
}

export const useAllData = () => {
  const { data = [] } = useData()

  return data
}

const filterPopular = (item: Product): boolean => {
  return item.sku.startsWith(POPULAR_SERViCE_PREFIX)
}

export const usePopularServices = () => {
  const { data = [] } = useData()

  return data.filter(filterPopular)
}

export const useIsLoading = () => {
  const { isFetching } = useData()

  return isFetching
}

export const useAllVendors = () => {
  const { data = [] } = useData()

  return getUniqueVendors(data)
}
