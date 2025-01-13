import { FC } from 'react'
import { Modal } from '../../components/modal.tsx'
import { createLink, useNavigate } from '@tanstack/react-router'
import {
  Alert,
  Box,
  Button,
  DialogActions,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { Empty } from './empty.tsx'
import { useGetNotifications } from '../../hooks/use-get-notifications.ts'
import { useSetPropOnFavorite } from '../../api.ts'
import HouseIcon from '@mui/icons-material/House'

const LinkedButton = createLink(Button)

export const Notifications: FC = () => {
  const notifications = useGetNotifications()
  const { mutate } = useSetPropOnFavorite()
  const navigate = useNavigate()
  const handleClose = () => navigate({ to: '/list' })

  const actionsSX =
    notifications.length < 5
      ? ({
          position: 'absolute',
          bottom: '30px',
          left: 0,
          width: '100%',
        } as const)
      : ({
          mb: '10px',
        } as const)

  return (
    <Modal
      open
      title=""
      onSave={handleClose}
      onClose={handleClose}
      hasSave={false}
      actions={
        <DialogActions
          sx={{
            p: 0,
            ...actionsSX,
          }}
        >
          <Box sx={{ p: 3, width: '100%' }}>
            <LinkedButton to="/list" fullWidth variant="contained">
              <HouseIcon color="secondary" />
            </LinkedButton>
          </Box>
        </DialogActions>
      }
    >
      {notifications.length === 0 && <Empty />}
      {notifications.length > 0 && (
        <Stack
          sx={{ p: 4, width: '100vw', maxWidth: '600px', margin: '0 auto' }}
          spacing={2}
        >
          {notifications.map((n) => {
            return (
              <Alert
                key={n.body}
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
                <Box
                  component={Typography}
                  variant="body2"
                  sx={{ color: 'text.primary' }}
                >
                  {n.title}
                </Box>

                <Box
                  component={Typography}
                  variant="caption"
                  sx={{ color: 'text.primary' }}
                >
                  {n.body}
                </Box>
              </Alert>
            )
          })}
        </Stack>
      )}
    </Modal>
  )
}
