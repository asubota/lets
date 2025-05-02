import { type FC } from 'react'

import { Box } from '@mui/material'

import { type CropArea } from './types.ts'

export const ScanArea: FC<{ cropArea: CropArea }> = ({ cropArea }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        border: '1px solid',
        borderColor: 'primary.main',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        left: cropArea.x,
        top: cropArea.y,
        width: cropArea.width,
        height: cropArea.height,
      }}
    />
  )
}
