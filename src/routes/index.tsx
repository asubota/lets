import { createFileRoute } from '@tanstack/react-router'

type Search = {
  s?: string
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): Search => {
    return {
      s: search?.s ? String(search.s) : undefined,
    }
  },
})
