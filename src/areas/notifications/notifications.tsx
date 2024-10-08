import { FC } from 'react'
import { Modal } from '../../components/modal.tsx'
import { useNavigate } from '@tanstack/react-router'
import { Alert, Box, Stack, Switch, Typography } from '@mui/material'
import { Empty } from './empty.tsx'
import { useGetNotifications } from '../../hooks/use-get-notifications.ts'
import { useSetPropOnFavorite } from '../../api.ts'

export const Notifications: FC = () => {
  const notifications = useGetNotifications()
  const { mutate } = useSetPropOnFavorite()
  const navigate = useNavigate()
  const handleClose = () => navigate({ to: '/' })

  return (
    <Modal
      open
      title=""
      onSave={handleClose}
      onClose={handleClose}
      hasSave={false}
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
