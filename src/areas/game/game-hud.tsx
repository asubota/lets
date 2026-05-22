import StopCircleIcon from '@mui/icons-material/StopCircle'
import { Box, IconButton, Stack, Typography } from '@mui/material'

import { COMBO_MULT_THRESHOLD_1_5X, COMBO_MULT_THRESHOLD_2X, getMultiplier } from './config.ts'
import {
  useCurrentCombo,
  useCurrentScore,
  useGameActions,
  useSessionStartedAt,
} from '../../store/game.ts'

export const GameHud = () => {
  const score = useCurrentScore()
  const combo = useCurrentCombo()
  const started = useSessionStartedAt()
  const { endSession } = useGameActions()

  if (started === null) {
    return null
  }

  const mult = getMultiplier(combo)
  const showCombo = combo >= COMBO_MULT_THRESHOLD_1_5X
  const isHot = combo >= COMBO_MULT_THRESHOLD_2X

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 76,
        right: 10,
        zIndex: 1305,
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
        alignItems: 'flex-end',
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ea2b06 0%, #a72aaa 100%)',
          color: '#fff',
          borderRadius: 2,
          px: 1.5,
          py: 0.6,
          minWidth: 86,
          boxShadow: '0 6px 18px rgba(234,43,6,0.45), 0 0 0 1px rgba(255,255,255,0.18) inset',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography
            sx={{
              fontWeight: 900,
              fontVariantNumeric: 'tabular-nums',
              fontSize: '1.3rem',
              lineHeight: 1.1,
              flex: 1,
              textShadow: '0 1px 2px rgba(0,0,0,0.4)',
              letterSpacing: '-0.3px',
            }}
          >
            {score}
          </Typography>
          <IconButton
            size="small"
            onClick={endSession}
            sx={{ p: 0.25, color: 'rgba(255,255,255,0.95)' }}
            aria-label="end-session"
          >
            <StopCircleIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      {showCombo && (
        <Box
          sx={{
            bgcolor: isHot ? '#ea2b06' : '#ffb300',
            color: '#fff',
            borderRadius: 1,
            px: 1.25,
            py: 0.35,
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: 0.3,
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.35)',
            animation: 'gameComboFlash 0.6s ease-in-out infinite',
          }}
        >
          ×{mult} · combo {combo}
        </Box>
      )}
    </Box>
  )
}
