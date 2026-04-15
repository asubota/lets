import { Box, Card, CircularProgress, Typography, useTheme } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

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
          <Box sx={{ width: '100%', maxWidth: 460, pointerEvents: 'auto' }}>
            <Card
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: '24px',
                // Theme will handle main styles, but we add loader-specific elevation
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)' 
                  : '0 16px 40px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={progress.percent || 0} 
                    size={60} 
                    thickness={4.5} 
                    sx={{ color: 'primary.main' }}
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
                        fontSize: '12px', 
                        color: 'text.primary',
                        fontFamily: '"Outfit", sans-serif'
                      }}
                    >
                      {`${progress.percent || 0}%`}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography 
                    variant="h6" 
                    noWrap 
                    sx={{ 
                      fontWeight: 800, 
                      fontFamily: '"Outfit", sans-serif',
                      letterSpacing: '-0.3px',
                      fontSize: '18px'
                    }}
                  >
                    Синхронізація
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    noWrap 
                    sx={{ 
                      display: 'block',
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 500,
                      opacity: 0.8
                    }}
                  >
                    {progress.loaded.toLocaleString()} / {progress.total.toLocaleString()} товарів
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                    flexShrink: 0,
                    opacity: 0.9
                  }}
                >
                  <Logo width="80px" />
                </Box>
              </Box>

              <Box
                sx={{
                  height: 6,
                  width: '100%',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percent || 0}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 3,
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
