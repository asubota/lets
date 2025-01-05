import { createFileRoute } from '@tanstack/react-router'
import { Home } from '../areas/home/home.tsx'

export const Route = createFileRoute('/')({
  component: Home,
})
