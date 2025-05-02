import { createLazyFileRoute } from '@tanstack/react-router'

import { Cart } from '../areas/cart/cart.tsx'

export const Route = createLazyFileRoute('/cart')({
  component: Cart,
})
