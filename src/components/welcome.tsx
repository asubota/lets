import { Box, Typography } from '@mui/material'

import { Bike } from './bike.tsx'
import { Logo } from './logo.tsx'
import { StaleVendorsWarning } from './stale-vendors-warning.tsx'

export const Welcome = () => {
  const handleThing = () => {
    // navigator.serviceWorker.ready.then(() => {
    //   if (navigator.serviceWorker.controller) {
    //     navigator.serviceWorker.controller.postMessage({ type: 'xxx' })
    //   }
    // })
  }

  return (
    <Box sx={{ userSelect: 'none', py: 8 }}>
      <Typography
        variant="h3"
        sx={{ 
          textAlign: 'center', 
          color: 'text.primary', 
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 800,
          mb: 2,
          letterSpacing: '-0.5px'
        }}
      >
        <span onClick={handleThing} style={{ cursor: 'pointer' }}>Здорова, братан!</span>
      </Typography>
      <Typography
        variant="h5"
        sx={{ 
          textAlign: 'center', 
          color: 'text.secondary', 
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 600,
          opacity: 0.8,
          lineHeight: 1.5
        }}
      >
        <Box>Шо, може підсобити?</Box>
        <Box>Чисто по-братськи?</Box>
      </Typography>

      <Box sx={{ mt: 6, opacity: 0.9 }}>
        <Bike type="safe" />
      </Box>
      <StaleVendorsWarning />
      <Logo 
        sx={{ 
          position: 'fixed', 
          left: '25px', 
          bottom: '25px',
          zIndex: 10,
          opacity: 0.8
        }} 
      />
    </Box>
  )
}
