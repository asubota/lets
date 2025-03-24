import { createLazyFileRoute } from '@tanstack/react-router'
import { Orders } from '../areas'

export const Route = createLazyFileRoute('/orders')({
  component: Orders,
})
