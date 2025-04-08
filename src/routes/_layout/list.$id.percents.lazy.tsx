import { createLazyFileRoute } from '@tanstack/react-router'
import { Percents } from '../../areas/list/percents.tsx'

export const Route = createLazyFileRoute('/_layout/list/$id/percents')({
  component: Percents,
})
