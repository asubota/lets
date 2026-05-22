import { createLazyFileRoute } from '@tanstack/react-router'

import { GamePage } from '../areas/game/game-page.tsx'

export const Route = createLazyFileRoute('/game')({
  component: GamePage,
})
