import { FC } from 'react'
import { Box } from '@mui/material'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'

export const Empty: FC = () => {
  return (
    <Box
      sx={{
        color: 'text.secondary',
        typography: 'h4',
        textAlign: 'center',
        mt: 6,
      }}
    >
      <DoNotDisturbAltIcon
        sx={{ fontSize: '140px', color: 'text.secondary' }}
      />
    </Box>
  )
}
