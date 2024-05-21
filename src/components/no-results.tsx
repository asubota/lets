import { Box, Typography } from '@mui/material'
import { Logo } from './logo.tsx'

import Bike from './broken-bike.svg?react'

export const NoResults = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        <Box>Наразі,</Box>
      </Typography>

      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        <Box sx={{ mt: 4 }}>всі механіки зайняті</Box>
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
