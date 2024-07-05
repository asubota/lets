import { FC, useContext } from 'react'
import { Box, IconButton, useTheme } from '@mui/material'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from '../theme-mode-provider.tsx'

export const ColorModeSwitch: FC = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box
      sx={{
        position: 'absolute',
        right: '20px',
        bottom: '60px',
        color: 'secondary.light',
      }}
    >
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  )
}
