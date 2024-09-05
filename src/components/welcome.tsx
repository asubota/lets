import { Box, Typography } from '@mui/material'
import { Logo } from './logo.tsx'
import { Bike } from './bike.tsx'
import { ExtraViewOptions } from './extra-view-options.tsx'

function showNotification() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((sw) => {
      const options: NotificationOptions = {
        body: 'Tra ta ta!',
        icon: '/lets/logo.webp',
      }

      sw.showNotification('new SKU added', options)
    })
  }
}

export const Welcome = () => {
  const doPush = () => {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        showNotification()
      }
    })
  }

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        sx={{ mt: 4 }}
        color="textSecondary"
      >
        <Box onClick={doPush}>Вітаю!</Box>
      </Typography>

      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ mt: 4 }}
        color="textSecondary"
      >
        <Box sx={{ mt: 4, mb: 1 }}>Вам щось підказати?</Box>
        <Box>Проконсультувати?</Box>
      </Typography>

      <Bike type="safe" />
      <Logo />

      <ExtraViewOptions />
    </Box>
  )
}
