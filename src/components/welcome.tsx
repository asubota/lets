import { Box, Typography } from '@mui/material'
import { Logo } from './logo.tsx'

import Bike from './bike.svg?react'

export const Welcome = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        <Box>Вітаю!</Box>
      </Typography>

      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        <Box sx={{ mt: 4, mb: 1 }}>Вам щось підказати?</Box>
        <Box>Проконсультувати?</Box>
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '300px',
          position: 'absolute',
          bottom: '185px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        <Bike />
      </Box>

      <Logo />
    </Box>
  )
}
