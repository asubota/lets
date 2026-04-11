import { type FC } from 'react'

import NotificationsIcon from '@mui/icons-material/Notifications'
import StarIcon from '@mui/icons-material/Star'
import { Box, IconButton } from '@mui/material'
import { createLink } from '@tanstack/react-router'

import { useIsLoading } from '../use-data.ts'
import { RedDot } from './red-dot.tsx'
import { useGetNotifications } from '../hooks/use-get-notifications.ts'
import { useIsRoute } from '../hooks/use-is-route.hook.ts'

const LinkedButton = createLink(IconButton)

export const AppBar: FC = () => {
  const loading = useIsLoading()
  const isFavouritesRoute = useIsRoute('/favorites')
  const unread = useGetNotifications('unread')

  return (
    <Box
      className="app-bar glass-panel"
      sx={{
        px: 1,
        py: 0.5,
        mx: 1,
        mt: 1,
        borderRadius: '16px',
        position: 'sticky',
        top: 8,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box className="app-bar-left">
        <LinkedButton
          to={isFavouritesRoute ? '/list' : '/favorites'}
          disabled={loading}
          sx={{
            color: isFavouritesRoute ? 'warning.main' : 'text.secondary',
            p: 1,
          }}
        >
          <StarIcon />
          {unread.length > 0 && <RedDot />}
        </LinkedButton>
      </Box>

      <Box className="app-bar-center" id="app-bar-center" sx={{ flex: 1, mx: 1 }} />

      <Box className="app-bar-right">
        <LinkedButton to="/notifications" sx={{ color: 'text.secondary', p: 1 }}>
          <NotificationsIcon />
          {unread.length > 0 && <RedDot />}
        </LinkedButton>
      </Box>
    </Box>
  )
}
