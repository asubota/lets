import { useQuery } from '@tanstack/react-query'

import { CACHE_BASE_KEY, POPULAR_SERViCE_PREFIX } from './constants.ts'
import { parseData } from './data-tools.ts'
import { buildItemTokens } from './search-tools.ts'
import { getGoogleFileId } from './secrets.ts'
import { type Meta, useAppActions } from './store'
import { getUniqueVendors } from './tools.tsx'
import { type IndexedProduct, type Product } from './types.ts'

const isMeta = (p: Product) => p.sku === '__meta__'
const isNotMeta = (p: Product) => p.sku !== '__meta__'

const getData = async (id: string, setMeta: (data: Meta) => void): Promise<IndexedProduct[]> => {
  if (id.length === 0) {
    return []
  }

  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=0`
  const response = await fetch(url)
  const text = await response.text()
  const products = parseData(text)
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
  const id = getGoogleFileId()
  const { setMeta } = useAppActions()
  return useQuery<IndexedProduct[]>({
    staleTime: 1000 * 60 * 10, // 10 minutes
    queryKey: [CACHE_BASE_KEY, id],
    queryFn: () => getData(id, setMeta),
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
