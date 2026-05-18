import { Box } from '@mui/material'
import { motion } from 'framer-motion'

import SafeBike from './bike.svg?react'
import BrokenBike from './broken-bike.svg?react'
import { Version } from './version.tsx'

export const Bike = ({ type }: { type: 'safe' | 'broken' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {type === 'safe' && (
        <Box
          component={motion.div}
          whileHover={{ scale: 1.1, rotate: 1.8 }}
          whileTap={{ scale: 1.2, rotate: 1.9 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'fit-content',
            transformOrigin: 'center',
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
        >
          <Version />
          <Box component={SafeBike} sx={{ width: '230px' }} />
        </Box>
      )}

      {type === 'broken' && (
        <Box component={BrokenBike} sx={{ width: '230px' }} />
      )}
    </Box>
  )
}
