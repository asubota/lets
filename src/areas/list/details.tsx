import { FC } from 'react'
import { DetailsPopup } from '../../components/details-popup.tsx'
import { Navigate, useNavigate, useParams } from '@tanstack/react-router'
import { useAllData } from '../../use-data.ts'

export const Details: FC = () => {
  const { id } = useParams({ from: '/_layout/list/$id/details' })
  const data = useAllData()
  const navigate = useNavigate()

  const [sku, vendor] = id.split(':')
  const product = data.find((p) => p.sku === sku && p.vendor === vendor)

  if (!product) {
    return <Navigate to="/list" />
  }

  return (
    <DetailsPopup details={product} onClose={() => navigate({ to: '/list' })} />
  )
}
