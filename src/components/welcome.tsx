import { Box, Typography } from '@mui/material'
import { Logo } from './logo.tsx'
import { Bike } from './bike.tsx'
import { ExtraViewOptions } from './extra-view-options.tsx'
import { useShowNotification } from '../hooks/use-show-notification.ts'

export const Welcome = () => {
  const showNotification = useShowNotification('silex 405')

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        sx={{ mt: 4 }}
        color="textSecondary"
      >
        <Box onClick={showNotification}>Вітаю!</Box>
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
