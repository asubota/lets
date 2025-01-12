import { FC } from 'react'
import { Box } from '@mui/material'
import SafeBike from './bike.svg?react'
import BrokenBike from './broken-bike.svg?react'
import { Version } from './version.tsx'

export const Bike: FC<{ type: 'safe' | 'broken' }> = ({ type }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '300px',
        position: 'absolute',
        bottom: '215px',
        left: '50%',
        transform: 'translate(-50%)',
      }}
    >
      {type === 'safe' && <Version />}
      {type === 'safe' && <SafeBike />}
      {type === 'broken' && <BrokenBike />}
    </Box>
  )
}
