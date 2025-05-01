import { createLazyFileRoute } from '@tanstack/react-router'
import { CheckEngine } from '../areas/check-engine/check-engine.tsx'

export const Route = createLazyFileRoute('/check-engine')({
  component: CheckEngine,
})
