import { FC, useContext } from 'react'
import PaletteIcon from '@mui/icons-material/Palette'
import { IconButton, Stack, useTheme } from '@mui/material'
import { useAppActions } from '../store'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { ColorModeContext } from '../theme-mode-provider.tsx'

export const ExtraViewOptions: FC = () => {
  const { setMode } = useAppActions()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Stack
      spacing={1}
      sx={{
        position: 'absolute',
        right: '25px',
        bottom: '25px',
      }}
    >
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>

      <IconButton onClick={() => setMode('colors')}>
        <PaletteIcon />
      </IconButton>
    </Stack>
  )
}
