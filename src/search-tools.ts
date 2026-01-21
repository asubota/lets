import { useMemo } from 'react'

import { useAppliedFilters } from './store/appliedFilters.ts'
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

export const useSearch = (search: string): Product[] => {
  const { data = [] } = useData()
  const appliedFilters = useAppliedFilters()
  const queryTokens = useMemo(() => tokenize(search), [search])

  return useMemo(() => {
    if (appliedFilters.length === 0 && queryTokens.length === 0) {
      return []
    }

    let filteredData = data

    if (appliedFilters.length > 0) {
      filteredData = filteredData.filter((p) => appliedFilters.includes(p.vendor))
    }

    if (queryTokens.length === 0) {
      return filteredData
    }

    return filteredData.filter((p) => tokensMatch(p.__tokens, queryTokens))
  }, [data, queryTokens, appliedFilters])
}
