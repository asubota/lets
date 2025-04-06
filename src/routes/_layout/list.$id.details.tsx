import { createFileRoute } from '@tanstack/react-router'
import { Details } from '../../areas/list/details.tsx'

export const Route = createFileRoute('/_layout/list/$id/details')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const navigate = Route.useNavigate()

  return <Details id={id} onClose={() => navigate({ to: '/list' })} />
}
