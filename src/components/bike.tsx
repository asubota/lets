import { Box } from '@mui/material'

import SafeBike from './bike.svg?react'
import BrokenBike from './broken-bike.svg?react'
import { Version } from './version.tsx'

export const Bike = ({ type }: { type: 'safe' | 'broken' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '200px',
        ml: 3,
        flexDirection: 'column',
      }}
    >
      {type === 'safe' && <Version />}
      {type === 'safe' && <Box component={SafeBike} sx={{ width: '270px' }} />}
      {type === 'broken' && (
        <Box component={BrokenBike} sx={{ width: '270px' }} />
      )}
    </Box>
  )
}
