import { Box, Typography } from '@mui/material'

export const NoResults = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        <Box>Наразі,</Box>
      </Typography>

      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        <Box sx={{ mt: 4 }}>всі механіки зайняті</Box>
      </Typography>
    </Box>
  )
}
