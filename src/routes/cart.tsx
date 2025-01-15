import { createFileRoute } from '@tanstack/react-router'
import { Cart } from '../areas/cart/cart.tsx'

type Search = {
  s?: string
}

export const Route = createFileRoute('/cart')({
  component: Cart,
  validateSearch: (search: Record<string, unknown>): Search => {
    return {
      s: search?.s ? String(search.s) : undefined,
    }
  },
})
