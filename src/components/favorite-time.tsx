import { type FC } from 'react'

import { Box } from '@mui/material'

import { formatDate } from '../tools.tsx'

export const FavoriteTime: FC<{ time: number | undefined }> = ({ time }) => {
  return (
    <Box
      sx={{
        color: 'info',
        typography: 'caption',
        lineHeight: 0,
        fontSize: '10px',
        mr: 1,
      }}
    >
      {time ? formatDate(new Date(time)) : 'давно'}
    </Box>
  )
}
