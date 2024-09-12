import { useQuery } from '@tanstack/react-query'
import { Product } from './types.ts'
import { useFavsItems } from './store/favs.ts'
import { useMemo } from 'react'
import { useBikeId } from './store'
import { getUniqueVendors } from './tools.tsx'

interface Column {
  id: string
  label: string
  type: string
  pattern?: string
}

type Cell = {
  v: string | number
  f?: string
} | null

interface Row {
  c: Cell[]
}

interface Root {
  cols: Column[]
  rows: Row[]
}

const parseData = (text: string): Product[] => {
  const cleanText = text
    .replace('/*O_o*/', '')
    .replace('\n', '')
    .replace('google.visualization.Query.setResponse(', '')
    .replace(/\);$/, '')

  const table: Root = JSON.parse(cleanText).table
  const columns = table.cols.map((column: { label: string }) => column.label)

  return table.rows.map((row) => {
    const obj: Record<string, unknown> = {}

    row.c.forEach((cell, index) => {
      const colName = columns[index]

      if (colName === 'pics' && cell) {
        const value = cell.v.toString()
        obj[colName] = !value.includes('[')
          ? [value]
          : Array.from(new Set(JSON.parse(value.replace(/'/g, '"'))))
      } else if (colName === 'name' && !cell) {
        const skuIndex = columns.indexOf('sku')
        const skuCell = row.c[skuIndex]
        obj[colName] = skuCell ? skuCell.v : '-'
      } else {
        obj[colName] = cell?.v ?? null
      }
    })

    return obj
  }) as unknown as Product[]
}

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
  const id = useBikeId()
  return useQuery<Product[]>({
    staleTime: 30 * 60 * 1000,
    queryKey: ['lets-bike-base', id],
    queryFn: () => getData(id),
  })
}

export const useNotifyData = () => {
  const { data } = useData()

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

const getKey = (item: Product): string => `${item.sku}:${item.vendor}`

export const useFavs = (): Product[] => {
  const favs = useFavsItems()
  const { data = [] } = useData()

  const favsSet = useMemo(() => new Set(favs), [favs])

  return useMemo(() => {
    const existingItems: Product[] = []
    const missingItems: Product[] = []

    const existingKeys = new Set<string>()

    data.forEach((item) => {
      const key = getKey(item)
      if (favsSet.has(key)) {
        existingItems.push(item)
        existingKeys.add(key)
      }
    })

    favs.forEach((key) => {
      if (!existingKeys.has(key)) {
        const [sku, vendor] = key.split(':')
        missingItems.push({
          sku,
          vendor,
          name: '-',
          price: 0,
          p2: 0,
          pics: null,
          link: null,
          availability: '',
          stock: '0',
          missed: true,
        })
      }
    })

    return [...missingItems, ...existingItems]
  }, [favsSet, data, favs])
}
