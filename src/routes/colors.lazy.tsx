import { Box, CircularProgress } from '@mui/material'
import { createLazyFileRoute } from '@tanstack/react-router'

import { useGetColors } from '../api-colors.ts'
import { ColorSettingsModal } from '../areas'
import { Modal } from '../components/modal.tsx'
import { useAllVendors, useIsLoading } from '../use-data.ts'

export const Route = createLazyFileRoute('/colors')({
  component: RouteComponent,
})

function RouteComponent() {
  const isDataLoading = useIsLoading()
  const navigate = Route.useNavigate()
  const close = () => navigate({ to: '/list' })
  const vendors = useAllVendors()
  const { isLoading, colors } = useGetColors()

  if (isLoading || isDataLoading) {
    return (
      <Modal open onClose={close} onSave={close} title="">
        <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="primary" />
        </Box>
      </Modal>
    )
  }

  return <ColorSettingsModal vendors={vendors} colors={colors} />
}
