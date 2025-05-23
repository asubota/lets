import { useContext } from 'react'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import InsightsIcon from '@mui/icons-material/Insights'
import PaletteIcon from '@mui/icons-material/Palette'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, IconButton, Stack, useTheme } from '@mui/material'
import { createLink } from '@tanstack/react-router'

import { useCartItemsCount } from '../hooks/use-cart-items-count.ts'
import { ColorModeContext } from '../theme-mode-provider.tsx'
import { PasteInSearchButton } from './toolbar/paste-in-search-button.tsx'

const LinkedIconButton = createLink(IconButton)

export const ExtraViewOptions = () => {
  const count = useCartItemsCount()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

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
        <PasteInSearchButton size="medium" />

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
              fontWeight: 'bold',
            }}
          >
            {count}
          </Box>
        </LinkedIconButton>
      </Stack>
    </>
  )
}
