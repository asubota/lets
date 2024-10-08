import { FC } from 'react'
import { Box } from '@mui/material'

export const Version: FC = () => {
  return (
    <Box
      component="span"
      sx={{
        color: 'text.secondary',
        position: 'absolute',
        left: '2px',
        bottom: 0,
        fontSize: '10px',
      }}
    >
      {import.meta.env.VITE_TEST_VAR}
    </Box>
  )
}
