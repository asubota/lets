import { type FC } from 'react'

import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import { Box, Typography } from '@mui/material'

export const Empty: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        textAlign: 'center',
        mt: 6,
      }}
    >
      <DoNotDisturbAltIcon sx={{ fontSize: '64px', color: 'text.secondary' }} />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Тихо поки що
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Нових сповіщень немає
        </Typography>
      </Box>
    </Box>
  )
}
