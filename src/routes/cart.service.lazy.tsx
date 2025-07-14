import { createLazyFileRoute } from '@tanstack/react-router'

import { Service } from '../areas/cart/service.tsx'

export const Route = createLazyFileRoute('/cart/service')({
  component: Service,
})
