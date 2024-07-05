import { Box, IconButton, Typography } from '@mui/material'
import { Logo } from './logo.tsx'
import { Bike } from './bike.tsx'
import PaletteIcon from '@mui/icons-material/Palette'
import { useAppActions } from '../store'

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

      <IconButton
        onClick={() => setMode('colors')}
        sx={{
          position: 'absolute',
          right: '20px',
          bottom: '20px',
          color: 'secondary.light',
        }}
      >
        <PaletteIcon />
      </IconButton>
    </Box>
  )
}
