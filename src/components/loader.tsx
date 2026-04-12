import { Box, Card, CircularProgress, Typography, useTheme } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

import { Bike } from './bike.tsx'
import { Logo } from './logo.tsx'
import { useLoadingProgress } from '../store'

export const Loader = () => {
  const progress = useLoadingProgress()
  const theme = useTheme()

  return (
    <AnimatePresence>
      {progress && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            position: 'absolute',
            top: '35%', // Lowered to avoid covering the header
            left: 0,
            right: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            padding: '0 20px',
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 420, pointerEvents: 'auto' }}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                borderRadius: '12px',
                boxShadow:
                  theme.palette.mode === 'dark' ? '0 20px 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.08)',
                background: theme.palette.mode === 'dark' ? 'rgba(40,40,40,0.9)' : 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
                  <CircularProgress variant="determinate" value={progress.percent || 0} size={52} thickness={4} />
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
                    <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '11px', color: 'text.primary' }}>
                      {`${progress.percent || 0}%`}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700 }}>
                    Синхронізація...
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                    {progress.loaded.toLocaleString()} / {progress.total.toLocaleString()} товарів
                  </Typography>
                </Box>

                {/* Smaller, side-by-side icons to prevent overlap */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    flexShrink: 0,
                    transform: 'scale(0.7)',
                    transformOrigin: 'right',
                  }}
                >
                  <Bike type="safe" />
                  <Logo />
                </Box>
              </Box>

              <Box
                sx={{
                  height: 4,
                  width: '100%',
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percent || 0}%` }}
                  style={{
                    height: '100%',
                    backgroundColor: theme.palette.primary.main,
                  }}
                />
              </Box>
            </Card>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
