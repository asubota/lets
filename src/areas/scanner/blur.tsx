import { type FC } from 'react'

import { Box } from '@mui/material'

import { type CropArea } from './types.ts'

export const Blur: FC<{ cropArea: CropArea }> = ({ cropArea }) => {
  return (
    <Box
      component="svg"
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <mask id="mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect
            x={cropArea.x}
            y={cropArea.y}
            width={cropArea.width}
            height={cropArea.height}
            fill="black"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        mask="url(#mask)"
        fill="rgba(0, 0, 0, 0.5)"
      />
    </Box>
  )
}
