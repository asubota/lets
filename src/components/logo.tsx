import { FC } from 'react'
import { Box } from '@mui/material'

export const Logo: FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '25px',
        bottom: '25px',
        width: '220px',
      }}
    >
      <Box
        component="img"
        src="/lets/logo.webp"
        alt="Logo"
        sx={{ width: '100%' }}
      />
    </Box>
  )
}
