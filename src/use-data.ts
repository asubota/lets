import { useQuery } from '@tanstack/react-query'
import { Product } from './types.ts'
import { useMemo } from 'react'
import { getUniqueVendors } from './tools.tsx'
import { CACHE_BASE_KEY } from './constants.ts'
import { getGoogleFileId } from './secrets.ts'

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
    .replace(/\n/g, '')
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
  const id = getGoogleFileId()
  return useQuery<Product[]>({
    staleTime: 1000 * 60 * 12, // 12 minutes
    queryKey: [CACHE_BASE_KEY, id],
    queryFn: () => getData(id),
  })
}

export const useAllData = () => {
  const { data = [] } = useData()

  const p: Product = {
    sku: 'asdasdasdasdasd',
    name: 'ololo',
    stock: '10',
    vendor: 'adm',
    pics: [],
    price: 100,
    p2: 1,
    link: null,
  }

  if (data.length > 0) {
    data.push(p)
  }

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
