import { Box, CircularProgress } from '@mui/material'

export const LoadingCart = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '50vh',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  )
}
