import { createLazyFileRoute } from '@tanstack/react-router'
import { Scanner } from '../areas'

export const Route = createLazyFileRoute('/scanner')({
  component: Scanner,
})
