import { Box } from '@mui/material'
import { motion } from 'framer-motion'

import SafeBike from './bike.svg?react'
import BrokenBike from './broken-bike.svg?react'
import { Version } from './version.tsx'

export const Bike = ({ type }: { type: 'safe' | 'broken' }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '200px',

        ...(type === 'broken' && {
          transform: 'translate(-50%)',
          left: '50%',
        }),
      }}
    >
      {type === 'safe' && (
        <Box
          component={motion.div}
          initial={{ x: -10, scaleX: 1 }}
          animate={{ x: '100vw', scaleX: 1 }}
          transition={{
            x: {
              duration: 10,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'reverse',
            },
            scaleX: {
              duration: 0,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'fit-content',
              gap: 1,
              transformOrigin: 'center',
            }}
          >
            <Version />
            <Box component={SafeBike} sx={{ width: '230px' }} />
          </Box>
        </Box>
      )}

      {type === 'broken' && (
        <Box component={BrokenBike} sx={{ width: '230px' }} />
      )}
    </Box>
  )
}
