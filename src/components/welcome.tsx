import { Box, IconButton, Typography } from '@mui/material'
import { Logo } from './logo.tsx'
import { Bike } from './bike.tsx'
import PaletteIcon from '@mui/icons-material/Palette'
import { useAppActions } from '../store'
import { ColorModeSwitch } from './color-mode-switch.tsx'

export const Welcome = () => {
  const { setMode } = useAppActions()

  return (
    <Box>
      <Typography variant="h3" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        <Box>Вітаю!</Box>
      </Typography>

      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        <Box sx={{ mt: 4, mb: 1 }}>Вам щось підказати?</Box>
        <Box>Проконсультувати?</Box>
      </Typography>

      <Bike type="safe" />
      <Logo />

      <ColorModeSwitch />
      <IconButton
        onClick={() => setMode('colors')}
        sx={{
          position: 'absolute',
          right: '20px',
          bottom: '20px',
        }}
      >
        <PaletteIcon />
      </IconButton>
    </Box>
  )
}
