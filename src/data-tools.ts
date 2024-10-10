import { Product } from './types.ts'

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

export const parseData = (text: string): Product[] => {
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
