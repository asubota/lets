import { createLazyFileRoute } from '@tanstack/react-router'
import { Stats } from '../areas/stats/stats.tsx'

export const Route = createLazyFileRoute('/stats')({
  component: Stats,
})
