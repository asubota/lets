import { useContext } from 'react'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import CloudIcon from '@mui/icons-material/Cloud'
import FolderIcon from '@mui/icons-material/Folder'
import InsightsIcon from '@mui/icons-material/Insights'
import PaletteIcon from '@mui/icons-material/Palette'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, IconButton, Stack, useTheme } from '@mui/material'
import { createLink } from '@tanstack/react-router'

import { useCartItemsCount } from '../hooks/use-cart-items-count.ts'
import { ColorModeContext } from '../theme-mode-provider.tsx'
import { useAppActions, useDataSource } from '../store'
import { PasteInSearchButton } from './toolbar/paste-in-search-button.tsx'
import { toast } from 'react-toastify'

const LinkedIconButton = createLink(IconButton)

export const ExtraViewOptions = () => {
  const count = useCartItemsCount()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const dataSource = useDataSource()
  const { setDataSource } = useAppActions()

  const toggleSource = () => {
    const nextSource = dataSource === 'google-drive' ? 'supabase' : 'google-drive'
    setDataSource(nextSource)

    // Clear Service Worker cache
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'cache-reset-request' })
    }

    toast.info(
      `🚀 База змінена на: ${nextSource === 'supabase' ? 'Supabase' : 'Google Drive'}`,
      {
        icon: false,
        autoClose: 2000,
        theme: 'colored',
        closeButton: false,
        hideProgressBar: true,
        position: 'bottom-left',
        style: {
          borderRadius: '16px',
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 600,
        },
      },
    )
  }

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
        <IconButton onClick={colorMode.toggleColorMode} sx={{ color: 'text.secondary' }}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <IconButton onClick={toggleSource} sx={{ color: 'text.secondary' }}>
          {dataSource === 'supabase' ? <CloudIcon /> : <FolderIcon />}
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
