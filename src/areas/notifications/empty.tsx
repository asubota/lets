import { type FC } from 'react'

import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import { Box } from '@mui/material'

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
