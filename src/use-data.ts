import { useQuery } from '@tanstack/react-query'
import { Product } from './types.ts'
import { useMemo } from 'react'
import { getUniqueVendors } from './tools.tsx'
import { CACHE_BASE_KEY } from './constants.ts'
import { getGoogleFileId } from './secrets.ts'
import { parseData } from './data-tools.ts'

const getData = async (id: string): Promise<Product[]> => {
  if (id.length === 0) {
    return []
  }

  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=0`
  const response = await fetch(url)
  const text = await response.text()

  return parseData(text)
}

const useData = () => {
  const id = getGoogleFileId()
  return useQuery<Product[]>({
    staleTime: 1000 * 60 * 12, // 12 minutes
    queryKey: [CACHE_BASE_KEY, id],
    queryFn: () => getData(id),
  })
}

export const useAllData = () => {
  const { data = [] } = useData()

  return data
}

export const useIsLoading = () => {
  const { isFetching } = useData()

  return isFetching
}

export const useAllVendors = () => {
  const { data = [] } = useData()

  return getUniqueVendors(data)
}

const filterBySearch = (item: Product, search: string): boolean => {
  return (
    item['sku'].toLowerCase().includes(search) ||
    item['name'].toLowerCase().includes(search)
  )
}

export const useSearch = (search: string): Product[] => {
  const { data = [] } = useData()

  return useMemo(() => {
    if (search.length < 3) {
      return []
    }

    const lowerCaseSearch = search.toLowerCase()
    return data.filter((item) => filterBySearch(item, lowerCaseSearch))
  }, [search, data])
}
