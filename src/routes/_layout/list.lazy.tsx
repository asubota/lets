import { createLazyFileRoute } from '@tanstack/react-router'
import { List } from '../../areas'

export const Route = createLazyFileRoute('/_layout/list')({
  component: List,
})
