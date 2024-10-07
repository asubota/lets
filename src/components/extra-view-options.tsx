import { FC, useContext } from 'react'
import PaletteIcon from '@mui/icons-material/Palette'
import { IconButton, Stack, useTheme } from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import { ColorModeContext } from '../theme-mode-provider.tsx'
import { Link } from '@tanstack/react-router'
import { RedDot } from './red-dot.tsx'
import { useGetNotifications } from '../hooks/use-get-notifications.ts'

export const ExtraViewOptions: FC = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const unread = useGetNotifications('unread')

  return (
    <Stack
      spacing={1}
      sx={{
        position: 'absolute',
        right: '25px',
        bottom: '25px',
      }}
    >
      <IconButton
        component={Link}
        sx={{ color: 'text.secondary' }}
        to="/notifications"
      >
        <NotificationsNoneIcon />
        {unread.length > 0 && <RedDot />}
      </IconButton>

      <IconButton
        onClick={colorMode.toggleColorMode}
        sx={{ color: 'text.secondary' }}
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>

      <IconButton
        component={Link}
        sx={{ color: 'text.secondary' }}
        to="/colors"
      >
        <PaletteIcon />
      </IconButton>
    </Stack>
  )
}
