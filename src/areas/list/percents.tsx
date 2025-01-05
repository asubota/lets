import { FC } from 'react'
import { Navigate, useNavigate, useParams } from '@tanstack/react-router'
import { useGetById } from './use-get-by-id.ts'
import { PercentsPopup } from '../../components/percents-popup.tsx'

export const Percents: FC = () => {
  const { id } = useParams({ from: '/_layout/list/$id/percents' })
  const product = useGetById(id)
  const navigate = useNavigate()

  if (!product) {
    return <Navigate to="/list" />
  }

  return (
    <PercentsPopup
      product={product}
      onClose={() => navigate({ to: '/list' })}
    />
  )
}
