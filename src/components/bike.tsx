import { FC } from 'react'
import { Box } from '@mui/material'
import SafeBike from './bike.svg?react'
import BrokenBike from './broken-bike.svg?react'
import { initGoogleAuth, loadGoogleApi } from '../google-auth.ts'

export const Bike: FC<{ type: 'safe' | 'broken' }> = ({ type }) => {
  const handleClick = () => {
    loadGoogleApi().then(initGoogleAuth)
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '300px',
        position: 'absolute',
        bottom: '185px',
        left: '50%',
        transform: 'translate(-50%)',
      }}
    >
      {type === 'safe' && <SafeBike />}
      {type === 'broken' && <BrokenBike onClick={handleClick} />}
    </Box>
  )
}
