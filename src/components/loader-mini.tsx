import { Box, CircularProgress, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

import { useAppActions, useLoaderCollapsed, useLoadingProgress } from '../store'

export const LoaderMini = () => {
  const progress = useLoadingProgress()
  const collapsed = useLoaderCollapsed()
  const { toggleLoaderCollapsed } = useAppActions()

  return (
    <AnimatePresence>
      {progress && collapsed && (
        <motion.div
          key="loader-mini"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          style={{
            position: 'fixed',
            top: '74px',
            right: '10px',
            zIndex: 1200,
            cursor: 'pointer',
          }}
          onClick={toggleLoaderCollapsed}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              p: 0.5,
              borderRadius: '50%',
              backdropFilter: 'blur(12px)',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : 'rgba(255,255,255,0.85)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)'
                  : '0 4px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={progress.percent || 0}
              size={40}
              thickness={4}
              sx={{ color: 'primary.main', display: 'block' }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  fontSize: '10px',
                  color: 'text.primary',
                  fontFamily: '"Outfit", sans-serif',
                  lineHeight: 1,
                }}
              >
                {`${progress.percent || 0}%`}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
