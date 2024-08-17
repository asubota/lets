import { FC } from 'react'
import { Box, Paper } from '@mui/material'
import { CropArea } from './types.ts'
import { height } from './constants.ts'

export const Output: FC<{ cropArea: CropArea; output: string }> = ({
  cropArea,
  output,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: cropArea.x,
        top: cropArea.y + height + 30,
        zIndex: 1,
        minWidth: cropArea.width,
      }}
    >
      <Paper sx={{ pl: '4px', pr: '4px' }}>{output}</Paper>
    </Box>
  )
}
