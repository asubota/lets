import { createLazyFileRoute } from '@tanstack/react-router'
import { Scanner } from '../areas/scanner/scanner.tsx'

export const Route = createLazyFileRoute('/scanner')({
  component: Scanner,
})
