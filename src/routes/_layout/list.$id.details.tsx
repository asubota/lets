import { createFileRoute } from '@tanstack/react-router'
import { Details } from '../../areas/list/details.tsx'

export const Route = createFileRoute('/_layout/list/$id/details')({
  component: Details,
})
