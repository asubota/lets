import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { FavNotification } from '../types.ts'

export const NotificationSnackbar: FC<{ n: FavNotification }> = ({ n }) => {
  return (
    <Box
      sx={{
        maxWidth: 'calc(100vw - 112px)',
        color: 'text.primary',
        textDecoration: 'none',
      }}
      component={Link}
      to="/"
      search={{ s: n.sku }}
    >
      <Box component={Typography} variant="body2">
        {n.title}
      </Box>
      <Box component={Typography} variant="caption">
        {n.body}
      </Box>
    </Box>
  )
}
