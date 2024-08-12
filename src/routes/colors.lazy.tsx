import { createLazyFileRoute } from '@tanstack/react-router'
import { ColorSettingsModal } from '../areas/colors/color-settings-modal.tsx'

export const Route = createLazyFileRoute('/colors')({
  component: ColorSettingsModal,
})
