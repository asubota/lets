import { createLazyFileRoute } from '@tanstack/react-router'
import { Shell } from '../shell.tsx'

export const Route = createLazyFileRoute('/')({
  component: Shell,
})
