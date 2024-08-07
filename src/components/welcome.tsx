import { Box, Typography } from '@mui/material'
import { Logo } from './logo.tsx'
import { Bike } from './bike.tsx'
import { ExtraViewOptions } from './extra-view-options.tsx'

export const Welcome = () => {
  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        sx={{ mt: 4 }}
        color="textSecondary"
      >
        <Box>Вітаю!</Box>
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
