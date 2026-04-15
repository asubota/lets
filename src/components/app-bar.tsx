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
        py: 0.75,
        mx: 1,
        mt: 1.5,
        borderRadius: '20px',
        position: 'sticky',
        top: 10,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Box className="app-bar-left">
        <LinkedButton
          to={isFavouritesRoute ? '/list' : '/favorites'}
          disabled={loading}
          sx={{
            'color': isFavouritesRoute ? 'primary.main' : 'text.secondary',
            'p': 0.75,
            'backgroundColor': (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.03)'
                : 'rgba(0,0,0,0.02)',
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.05)',
            },
          }}
        >
          <StarIcon sx={{ fontSize: '22px' }} />
          {unread.length > 0 && <RedDot />}
        </LinkedButton>
      </Box>

      <Box className="app-bar-center" id="app-bar-center" sx={{ flex: 1, mx: 0.75 }} />

      <Box className="app-bar-right">
        <LinkedButton 
          to="/notifications" 
          sx={{ 
            'color': 'text.secondary', 
            'p': 0.75,
            'backgroundColor': (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.03)'
                : 'rgba(0,0,0,0.02)',
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.05)',
            },
          }}
        >
          <NotificationsIcon sx={{ fontSize: '22px' }} />
          {unread.length > 0 && <RedDot />}
        </LinkedButton>
      </Box>
    </Box>
  )
}
