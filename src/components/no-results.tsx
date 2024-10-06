import { Box, Typography } from '@mui/material'
import { Logo } from './logo.tsx'
import { Bike } from './bike.tsx'

export const NoResults = () => {
  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          mt: 4,
        }}
      >
        <Box>Наразі,</Box>
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          mt: 4,
        }}
      >
        <Box sx={{ mt: 4 }}>всі механіки зайняті</Box>
      </Typography>
      <Bike type="broken" />
      <Logo />
    </Box>
  )
}
