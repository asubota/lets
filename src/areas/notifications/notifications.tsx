import HouseIcon from '@mui/icons-material/House'
import { Alert, Box, Button, DialogActions, Stack, Switch, Typography } from '@mui/material'
import { createLink, useNavigate } from '@tanstack/react-router'

import { Empty } from './empty.tsx'
import { useSetPropOnFavorite } from '../../api.ts'
import { Modal } from '../../components/modal.tsx'
import { Stock } from '../../components/stock.tsx'
import { VendorChip } from '../../components/vendor-chip.tsx'
import { useGetNotifications } from '../../hooks/use-get-notifications.ts'

const LinkedButton = createLink(Button)

export const Notifications = () => {
  const notifications = useGetNotifications()
  const { mutate } = useSetPropOnFavorite()
  const navigate = useNavigate()
  const handleClose = () => navigate({ to: '/list' })

  return (
    <Modal
      open
      title=""
      onSave={handleClose}
      onClose={handleClose}
      hasSave={false}
      actions={
        <DialogActions sx={{ p: 3, pt: 2, width: '100%' }}>
          <LinkedButton to="/list" fullWidth variant="contained">
            <HouseIcon color="secondary" />
          </LinkedButton>
        </DialogActions>
      }
    >
      {notifications.length === 0 && (
        <>
          <Empty />
          <Box sx={{ flexGrow: 1 }} />
        </>
      )}
      {notifications.length > 0 && (
        <Stack
          sx={{
            p: 3,
            pb: 0,
            margin: '0 auto',
            flexGrow: 1,
          }}
          spacing={2}
        >
          {notifications.map((n) => {
            return (
              <Alert
                key={`${n.favoriteId}:${n.body}`}
                sx={{
                  '.MuiAlert-action': {
                    p: 0,
                    pl: 1,
                    alignItems: 'center',
                  },
                }}
                severity="warning"
                variant="outlined"
                action={
                  <Switch
                    size="small"
                    checked={!n.read}
                    onChange={(_, v) => {
                      mutate({ favoriteId: n.favoriteId, read: !v })
                    }}
                  />
                }
              >
                <Box component={Typography} variant="body2" sx={{ color: 'text.primary' }}>
                  {n.title}
                </Box>

                <Box component={Typography} variant="caption" sx={{ color: 'text.primary' }}>
                  {n.body}
                </Box>

                <Box
                  sx={{
                    mt: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <VendorChip source="live" vendor={n.product.vendor} />
                  <Stock stock={n.product.stock} bordered />
                </Box>
              </Alert>
            )
          })}
        </Stack>
      )}
    </Modal>
  )
}
