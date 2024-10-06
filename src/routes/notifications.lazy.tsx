import { createLazyFileRoute } from '@tanstack/react-router'
import { Notifications } from '../areas'

export const Route = createLazyFileRoute('/notifications')({
  component: Notifications,
})
