import { FC } from 'react'
import { Modal } from '../../components/modal.tsx'
import { useNavigate } from '@tanstack/react-router'
import { useGetMinMaxBySku } from '../../hooks/use-get-min-max-by-sku.ts'
import { useGetChangedProducts } from '../../hooks/use-get-changed-products.hook.ts'
import { getMessages } from '../../tools.tsx'
import { Alert, Box, Stack, Switch, Typography } from '@mui/material'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'

export const Notifications: FC = () => {
  const minmax = useGetMinMaxBySku()
  const { items } = useGetChangedProducts()
  const messages = getMessages(items, minmax)

  const navigate = useNavigate()

  const handleSave = () => {
    navigate({ to: '/' })
  }

  const handleClose = () => {
    navigate({ to: '/' })
  }

  return (
    <Modal
      open
      title=""
      onSave={handleSave}
      onClose={handleClose}
      hasSave={false}
    >
      {messages.length === 0 && (
        <Box
          sx={{
            color: 'text.secondary',
            typography: 'h4',
            textAlign: 'center',
            mt: 6,
          }}
        >
          <DoNotDisturbAltIcon
            sx={{ fontSize: '140px', color: 'text.secondary' }}
          />
        </Box>
      )}
      <Stack
        sx={{ p: 4, width: '100vw', maxWidth: '600px', margin: '0 auto' }}
        spacing={2}
      >
        {messages.map((m) => {
          return (
            <Alert
              key={m.payload.options.body}
              sx={{
                '.MuiAlert-action': {
                  p: 0,
                  pl: 1,
                  alignItems: 'center',
                },
              }}
              severity="warning"
              variant="outlined"
              action={<Switch size="small" />}
            >
              <Box
                component={Typography}
                variant="body2"
                sx={{ color: 'text.primary' }}
              >
                {m.payload.title}
              </Box>

              <Box
                component={Typography}
                variant="caption"
                sx={{ color: 'text.primary' }}
              >
                {m.payload.options.body}
              </Box>
            </Alert>
          )
        })}
      </Stack>
    </Modal>
  )
}
