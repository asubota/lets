import { createFileRoute } from '@tanstack/react-router'
import { Percents } from '../../areas/list/percents.tsx'

export const Route = createFileRoute('/_layout/list/$id/percents')({
  component: Percents,
})
