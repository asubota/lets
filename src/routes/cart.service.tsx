import { createFileRoute } from '@tanstack/react-router'

import { Service } from '../areas/cart/service.tsx'

export const Route = createFileRoute('/cart/service')({
  component: Service,
})
