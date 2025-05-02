import { type FC } from 'react'

import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
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
    <Box className="app-bar" sx={{ pt: 1 }}>
      <Box className="app-bar-left">
        <LinkedButton
          to={isFavouritesRoute ? '/list' : '/favorites'}
          disabled={loading}
          sx={{
            color: isFavouritesRoute ? 'warning.light' : 'text.secondary',
          }}
        >
          <StarIcon />
          {unread.length > 0 && <RedDot />}
        </LinkedButton>
      </Box>

      <Box className="app-bar-center" id="app-bar-center" />

      <Box className="app-bar-right">
        <LinkedButton to="/scanner" sx={{ color: 'text.secondary' }}>
          <VisibilityIcon />
        </LinkedButton>
      </Box>
    </Box>
  )
}
