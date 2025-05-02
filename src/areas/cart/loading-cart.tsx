import { type FC } from 'react'

import { Box, CircularProgress } from '@mui/material'

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
