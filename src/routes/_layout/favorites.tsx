import { createFileRoute } from '@tanstack/react-router'
import { Favorites } from '../../areas'

export const Route = createFileRoute('/_layout/favorites')({
  component: Favorites,
})
