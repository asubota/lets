import { type FC } from 'react'

import { Box, Typography } from '@mui/material'

import { useTableActions } from '../store'

export const AllColumnsAreDisabled: FC = () => {
  const { toggleSettings } = useTableActions()

  return (
    <Box
      sx={{
        mt: '100px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: 'primary.main', cursor: 'pointer' }}
        onClick={toggleSettings}
      >
        All columns are disabled!
      </Typography>
    </Box>
  )
}
