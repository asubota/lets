import { FC } from 'react'
import { DetailsPopup } from '../../components/details-popup.tsx'
import { Navigate, useNavigate, useParams } from '@tanstack/react-router'
import { useGetById } from './use-get-by-id.ts'

export const Details: FC = () => {
  const { id } = useParams({ from: '/_layout/list/$id/details' })
  const product = useGetById(id)
  const navigate = useNavigate()

  if (!product || !product.pics) {
    return <Navigate to="/list" />
  }

  return (
    <DetailsPopup details={product} onClose={() => navigate({ to: '/list' })} />
  )
}
