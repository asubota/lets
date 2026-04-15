import { type FC } from 'react'

import { Box } from '@mui/material'

import { type SxProps, type Theme } from '@mui/material'

export const Logo: FC<{ width?: string | number; sx?: SxProps<Theme> }> = ({ width = '220px', sx }) => {
  return (
    <Box
      sx={{
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
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
