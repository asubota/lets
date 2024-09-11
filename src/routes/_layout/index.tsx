import { createFileRoute } from '@tanstack/react-router'
import { List } from '../../areas'

type Search = {
  s?: string
}

export const Route = createFileRoute('/_layout/')({
  component: List,
  validateSearch: (search: Record<string, unknown>): Search => {
    return {
      s: search?.s ? String(search.s) : undefined,
    }
  },
})
