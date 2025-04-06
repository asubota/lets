import { DetailsPopup } from '../../components/details-popup.tsx'
import { Navigate } from '@tanstack/react-router'
import { useGetById } from './use-get-by-id.ts'

interface DetailsProps {
  id: string
  onClose(): void
}

export const Details = ({ id, onClose }: DetailsProps) => {
  const product = useGetById(id)

  if (!product || !product.pics) {
    return <Navigate to="/list" />
  }

  return <DetailsPopup details={product} onClose={onClose} />
}
