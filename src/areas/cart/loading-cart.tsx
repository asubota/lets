import { Box, CircularProgress } from '@mui/material'
import { FC } from 'react'

export const LoadingCart: FC = () => {
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
