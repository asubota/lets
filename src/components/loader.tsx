import { Box, CircularProgress } from '@mui/material'
import { Bike } from './bike.tsx'
import { Logo } from './logo.tsx'

export const Loader = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40px' }}>
        <CircularProgress size={80} thickness={3} color="secondary" />
      </Box>

      <Bike type="safe" />
      <Logo />
    </Box>
  )
}
