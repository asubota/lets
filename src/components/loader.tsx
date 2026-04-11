import { Box, Card, CircularProgress, Typography } from '@mui/material'

import { Bike } from './bike.tsx'
import { Logo } from './logo.tsx'
import { useLoadingProgress } from '../store'

export const Loader = () => {
  const progress = useLoadingProgress()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40px', mb: '20px' }}>
        {progress ? (
          <Card
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              border: '1px solid',
              borderColor: 'divider',
              minWidth: 300,
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={progress.percent}
                size={70}
                thickness={4}
                color="primary"
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
                  component="div"
                  color="text.secondary"
                  sx={{ fontWeight: 'bold', fontSize: '14px' }}
                >
                  {`${progress.percent}%`}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Завантаження товарів...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Отримано {progress.loaded.toLocaleString()} з{' '}
                {progress.total.toLocaleString()}
              </Typography>
              <Box
                sx={{
                  mt: 1.5,
                  height: 4,
                  width: '100%',
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${progress.percent}%`,
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease-in-out',
                  }}
                />
              </Box>
            </Box>
          </Card>
        ) : (
          <CircularProgress size={80} thickness={3} color="secondary" />
        )}
      </Box>

      <Bike type="safe" />
      <Logo />
    </Box>
  )
}
