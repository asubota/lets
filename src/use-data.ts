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

const sheetId = '1PTFHlmgxkWUfb2vAykW1taGO0H45__jg'

const parseData = (text: string) => {
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
  })
}

export const getData = async () => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq&gid=0`
  const response = await fetch(url)
  const text = await response.text()

  return parseData(text)
}
