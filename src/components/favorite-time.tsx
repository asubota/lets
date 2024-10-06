import { Box } from '@mui/material'
import { FC } from 'react'
import { formatDate } from '../tools.tsx'

export const FavoriteTime: FC<{ time: number | undefined }> = ({ time }) => {
  return <Box>{time ? formatDate(new Date(time)) : 'давно'}</Box>
}
