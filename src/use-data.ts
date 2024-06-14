import { useQuery } from '@tanstack/react-query'
import { Product } from './types.ts'
import { useFavsItems } from './store/favs.ts'
import { useMemo } from 'react'

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

const sheetId = '1NJsdP-CUztIwlj1cnBkDj4pgqqaBuxPm'

const filterBySearch = (item: Product, search: string): boolean => {
  return (
    item['sku'].toLowerCase().includes(search.toLowerCase()) ||
    item['name'].toLowerCase().includes(search.toLowerCase())
  )
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
      if (columns[index] === 'pics' && cell) {
        const value = cell.v.toString()
        obj[columns[index]] = !value.includes('[')
          ? [value]
          : JSON.parse(value.replace(/'/g, '"'))
      } else {
        obj[columns[index]] = cell ? cell.v : null
      }
    })

    return obj
  }) as unknown as Product[]
}

const getData = async (): Promise<Product[]> => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq&gid=0`
  const response = await fetch(url)
  const text = await response.text()

  return parseData(text)
}

const useData = () =>
  useQuery<Product[]>({
    staleTime: 30 * 60 * 1000,
    queryKey: ['lets-bike-base'],
    queryFn: getData,
  })

export const useIsLoading = () => {
  const { isFetching } = useData()

  return isFetching
}

export const useSearch = (search: string): Product[] => {
  const { data = [] } = useData()

  if (search.length < 3) {
    return []
  }

  return data.filter((item) => filterBySearch(item, search))
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
