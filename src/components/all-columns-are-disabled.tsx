import { FC } from 'react'
import { useTableActions } from '../store'
import { Box, Typography } from '@mui/material'

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
