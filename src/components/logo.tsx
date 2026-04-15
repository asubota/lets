import { type FC } from 'react'

import { Box } from '@mui/material'

export const Logo: FC<{ width?: string | number }> = ({ width = '220px' }) => {
  return (
    <Box
      sx={{
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src="/lets/logo.webp"
        alt="Logo"
        sx={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </Box>
  )
}
