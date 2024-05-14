import { Box, Typography } from '@mui/material'

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
    </Box>
  )
}
