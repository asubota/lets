import { Box, Typography } from '@mui/material'
import { Logo } from './logo.tsx'
import { Bike } from './bike.tsx'
import { ExtraViewOptions } from './extra-view-options.tsx'
import { ReAuth } from './re-auth.tsx'

export const Welcome = () => {
  const handleThing = () => {
    // navigator.serviceWorker.ready.then(() => {
    //   if (navigator.serviceWorker.controller) {
    //     navigator.serviceWorker.controller.postMessage({ type: 'xxx' })
    //   }
    // })
  }

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
        <Box onClick={handleThing}>Вітаю!</Box>
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
        <Box sx={{ mt: 4, mb: 1 }}>Вам щось підказати?</Box>
        <Box>Проконсультувати?</Box>
      </Typography>

      <ReAuth />
      <Bike type="safe" />
      <Logo />
      <ExtraViewOptions />
    </Box>
  )
}
