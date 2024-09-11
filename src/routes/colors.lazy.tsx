import { createLazyFileRoute } from '@tanstack/react-router'
import { ColorSettingsModal } from '../areas'

export const Route = createLazyFileRoute('/colors')({
  component: ColorSettingsModal,
})
