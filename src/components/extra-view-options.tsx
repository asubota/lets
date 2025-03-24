import { FC, useContext } from 'react'
import PaletteIcon from '@mui/icons-material/Palette'
import { Box, IconButton, Stack, useTheme } from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InsightsIcon from '@mui/icons-material/Insights'
import EmailIcon from '@mui/icons-material/Email';

import { ColorModeContext } from '../theme-mode-provider.tsx'
import { createLink } from '@tanstack/react-router'
import { RedDot } from './red-dot.tsx'
import { useGetNotifications } from '../hooks/use-get-notifications.ts'
import { useCartItemsCount } from '../hooks/use-cart-items-count.ts'

const LinkedIconButton = createLink(IconButton)

export const ExtraViewOptions: FC = () => {
  const count = useCartItemsCount()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const unread = useGetNotifications('unread')

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          position: 'absolute',
          right: '25px',
          bottom: '25px',
        }}
      >
        <LinkedIconButton sx={{ color: 'text.secondary' }} to="/notifications">
          <NotificationsIcon />
          {unread.length > 0 && <RedDot />}
        </LinkedIconButton>

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

        <LinkedIconButton sx={{ color: 'text.secondary' }} to="/colors">
          <PaletteIcon />
        </LinkedIconButton>

        <LinkedIconButton sx={{ color: 'text.secondary' }} to="/stats">
          <InsightsIcon />
        </LinkedIconButton>
      </Stack>

      <Stack
        spacing={1}
        sx={{
          position: 'absolute',
          right: '75px',
          bottom: '25px',
        }}
      >
        <LinkedIconButton to="/orders" sx={{ color: 'text.secondary' }}>
          <EmailIcon />
        </LinkedIconButton>

        <LinkedIconButton to="/cart" sx={{ color: 'text.secondary' }}>
          <ShoppingCartIcon />
          <Box
            component="span"
            sx={{
              color: 'red',
              fontSize: '12px',
              position: 'absolute',
              right: '-5px',
              top: '-2px',
            }}
          >
            {count}
          </Box>
        </LinkedIconButton>
      </Stack>
    </>
  )
}
