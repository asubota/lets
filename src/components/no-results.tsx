import ConstructionIcon from '@mui/icons-material/Construction'
import { Box, Typography } from '@mui/material'

import { Bike } from './bike.tsx'
import { Logo } from './logo.tsx'

export const NoResults = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'text.secondary', mt: 3 }}
      >
        <Box>Наразі,</Box>
      </Typography>
      <Typography
        variant="h5"
        sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}
      >
        <Box>всі механіки зайняті</Box>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ConstructionIcon
          sx={{ mt: 2, fontSize: '90px', color: 'text.secondary' }}
        />
      </Box>

      <Bike type="broken" />
      <Logo />
    </Box>
  )
}
