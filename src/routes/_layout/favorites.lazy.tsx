import { createLazyFileRoute } from '@tanstack/react-router'

import { Favorites } from '../../areas'

export const Route = createLazyFileRoute('/_layout/favorites')({
  component: Favorites,
})
