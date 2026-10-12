import { createFileRoute } from '@tanstack/react-router'

interface Search {
  s?: string | undefined
}

export const Route = createFileRoute('/_layout/list')({
  validateSearch: (search: Record<string, unknown>): Search => {
    const { s } = search
    return {
      s: (typeof s === 'string' || typeof s === 'number') && s ? String(s) : undefined,
    }
  },
})
