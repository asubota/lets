import { useQuery } from '@tanstack/react-query'

interface Column {
  id: string
  label: string
  type: string
  pattern?: string
}

interface Cell {
  v: string | number
  f?: string
}

interface Row {
  c: Cell[]
}

interface Root {
  cols: Column[]
  rows: Row[]
}

interface Product {
  CreatedAt: string
  Id: number
  UpdatedAt: null
  Артикул: string
  Назва: string
  Наявність: string
  Продавець: string
  Ціна: string
}

const sheetId = '1PTFHlmgxkWUfb2vAykW1taGO0H45__jg'

export const filterBySearch = (item: Product, search: string): boolean => {
  return (
    item['Артикул'].toLowerCase().includes(search.toLowerCase()) ||
    item['Назва'].toLowerCase().includes(search.toLowerCase())
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
      obj[columns[index]] = cell.v
    })

    return obj
  }) as unknown as Product[]
}

export const getData = async (): Promise<Product[]> => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq&gid=0`
  const response = await fetch(url)
  const text = await response.text()

  return parseData(text)
}

export const useSearch = (search: string) => {
  const { data = [] } = useQuery<Product[]>({
    staleTime: 30 * 60 * 1000,
    queryKey: ['lets-bike-base'],
    queryFn: getData,
  })

  if (search.length < 3) {
    return []
  }

  return data?.filter((item) => filterBySearch(item, search))
}
