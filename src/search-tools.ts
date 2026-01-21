import { useMemo } from 'react'

import { type SortField, type SortOrder, useAppliedFilters, useSortConfig } from './store/appliedFilters.ts'
import { type Product } from './types.ts'
import { useData } from './use-data.ts'

const normalize = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\u0400-\u04FF]+/giu, ' ')
    .trim()

const tokenize = (s: string) => normalize(s).split(/\s+/).filter(Boolean)

export const buildItemTokens = (item: Product) => tokenize(`${item.sku} ${item.name} ${item.vendor ?? ''}`)

function tokensMatch(itemTokens: string[], queryTokens: string[]): boolean {
  for (const q of queryTokens) {
    let ok = false

    for (const t of itemTokens) {
      if (t.includes(q)) {
        ok = true
        break
      }
    }

    if (!ok) {
      return false
    }
  }

  return true
}

function descendingComparator(a: Product, b: Product, orderBy: SortField) {
  if (!orderBy) {
    return 0
  }

  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order: SortOrder, orderBy: SortField): (a: Product, b: Product) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const useSearch = (search: string): Product[] => {
  const { data = [] } = useData()
  const appliedFilters = useAppliedFilters()
  const { field, order } = useSortConfig()
  const queryTokens = useMemo(() => tokenize(search), [search])

  return useMemo(() => {
    if (appliedFilters.length === 0 && queryTokens.length === 0) {
      return []
    }

    let filteredData = data

    if (appliedFilters.length > 0) {
      filteredData = filteredData.filter((p) => appliedFilters.includes(p.vendor))
    }

    if (queryTokens.length > 0) {
      filteredData = filteredData.filter((p) => tokensMatch(p.__tokens, queryTokens))
    }

    if (field && order) {
      filteredData = [...filteredData].sort(getComparator(order, field))
    }

    return filteredData
  }, [data, queryTokens, appliedFilters, field, order])
}
