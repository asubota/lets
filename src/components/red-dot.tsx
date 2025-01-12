import { FC } from 'react'
import { Box } from '@mui/material'

export const RedDot: FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        borderRadius: '50%',
        width: '6px',
        height: '6px',
        position: 'absolute',
        right: '4px',
        top: '4px',
      }}
    />
  )
}
