import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { createLink } from '@tanstack/react-router'
import { FavNotification } from '../types.ts'

const LinkedBox = createLink(Box)

export const NotificationSnackbar: FC<{ n: FavNotification }> = ({ n }) => {
  return (
    <LinkedBox
      sx={{
        maxWidth: 'calc(100vw - 112px)',
        color: 'text.primary',
        textDecoration: 'none',
      }}
      to="/"
      search={{ s: n.sku }}
    >
      <Box component={Typography} variant="body2">
        {n.title}
      </Box>
      <Box component={Typography} variant="caption">
        {n.body}
      </Box>
    </LinkedBox>
  )
}
