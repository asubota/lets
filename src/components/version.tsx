import { FC } from 'react'
import { Box } from '@mui/material'

export const Version: FC = () => {
  return (
    <Box
      component="span"
      sx={{
        color: 'text.secondary',
        position: 'absolute',
        left: '152px',
        top: '94px',
        fontSize: '9px',
        rotate: '-44deg',
      }}
    >
      {import.meta.env.VITE_TEST_VAR}
    </Box>
  )
}
