import { type ReactNode, useMemo } from 'react'

import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MusicOffIcon from '@mui/icons-material/MusicOff'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import VibrationIcon from '@mui/icons-material/Vibration'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import {
  Box,
  Paper,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material'

import { ITEM_KINDS } from './config.ts'
import { ItemSvg } from './item-svg.tsx'
import { Leaderboard, buildLeaderboardSummary } from './leaderboard.tsx'
import { TopBottomHome } from '../../components/top-botton-home.tsx'
import { useGameActions, useGameMode, useGameScores, useGameSettings } from '../../store/game.ts'

const KIND_LABELS: Record<keyof typeof ITEM_KINDS, string> = {
  common: 'звичайний',
  uncommon: 'нечастий',
  rare: 'рідкісний',
  rocket: 'золотий',
}

const AUTO_END_PRESETS: Array<{ value: number; label: string }> = [
  { value: 60, label: '1хв' },
  { value: 600, label: '10хв' },
]

const GRADIENTS = {
  onDark: 'linear-gradient(135deg, rgba(234,43,6,0.32), rgba(167,42,170,0.28))',
  onLight: 'linear-gradient(135deg, rgba(234,43,6,0.16), rgba(167,42,170,0.16))',
  offDark: 'linear-gradient(135deg, rgba(30,41,59,0.45), rgba(15,23,42,0.45))',
  offLight: 'linear-gradient(135deg, rgba(15,23,42,0.04), rgba(15,23,42,0.06))',
}

const pickGradient = (active: boolean, dark: boolean): string => {
  if (active) {
    return dark ? GRADIENTS.onDark : GRADIENTS.onLight
  }
  return dark ? GRADIENTS.offDark : GRADIENTS.offLight
}

const PageTitle = () => (
  <Box sx={{ textAlign: 'center', mt: 1, mb: 0.5 }}>
    <Typography
      sx={{
        fontWeight: 900,
        letterSpacing: '-0.5px',
        fontSize: { xs: '1.65rem', sm: '2.1rem' },
        lineHeight: 1.1,
        background: 'linear-gradient(135deg, #ea2b06 0%, #a72aaa 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      <span style={{ WebkitTextFillColor: 'initial', marginRight: 6 }}>🍆</span>
      Шалений дициметр
    </Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
      лови, заробляй очки, бий рекорди
    </Typography>
  </Box>
)

const KpiPill = ({
  label,
  value,
  accent,
}: {
  label: string
  value: string | number
  accent?: boolean
}) => (
  <Box
    sx={(t) => ({
      px: 1,
      py: 0.75,
      borderRadius: 0.75,
      textAlign: 'center',
      background: t.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
      border:
        t.palette.mode === 'dark'
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(15,23,42,0.04)',
    })}
  >
    <Typography
      variant="caption"
      sx={{ color: 'text.secondary', display: 'block', lineHeight: 1, fontSize: '0.7rem' }}
    >
      {label}
    </Typography>
    <Typography
      sx={(t) => ({
        fontWeight: 800,
        fontSize: '1.05rem',
        lineHeight: 1.2,
        fontVariantNumeric: 'tabular-nums',
        color: accent ? t.palette.primary.main : t.palette.text.primary,
      })}
    >
      {value}
    </Typography>
  </Box>
)

const HeroCard = () => {
  const theme = useTheme()
  const gameMode = useGameMode()
  const scores = useGameScores()
  const { setGameMode } = useGameActions()
  const summary = useMemo(() => buildLeaderboardSummary(scores), [scores])

  const gradient = pickGradient(gameMode, theme.palette.mode === 'dark')
  const accuracy =
    summary.totalTaps > 0
      ? `${Math.round((summary.totalRockets / summary.totalTaps) * 100)}%`
      : '—'

  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        position: 'relative',
        borderRadius: 1.5,
        overflow: 'hidden',
        background: gradient,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border:
          t.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(15,23,42,0.06)',
      })}
    >
      <Box sx={{ p: { xs: 1.75, sm: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: gameMode
                ? 'linear-gradient(135deg, #ea2b06, #a72aaa)'
                : 'rgba(125,125,125,0.18)',
              color: '#fff',
              transition: 'background 240ms ease',
              animation: gameMode ? 'gameHeroPulse 2.4s ease-in-out infinite' : undefined,
              flexShrink: 0,
            }}
          >
            <RocketLaunchIcon sx={{ fontSize: 24 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
              Game Mode
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {gameMode ? 'Лови об\'єкти у польоті' : 'Зараз вимкнено'}
            </Typography>
          </Box>
          <Switch
            checked={gameMode}
            onChange={(e) => setGameMode(e.target.checked)}
            color="primary"
            sx={{ transform: 'scale(1.15)' }}
          />
        </Stack>

        <Box
          sx={{
            mt: 1.5,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
          }}
        >
          <KpiPill label="Best" value={summary.best} accent={gameMode} />
          <KpiPill label="Сесій" value={summary.sessions} />
          <KpiPill label="👑" value={summary.totalRockets} />
          <KpiPill label="Влучн." value={accuracy} />
        </Box>
      </Box>
    </Paper>
  )
}

const KindsRow = () => {
  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        p: 1.75,
        borderRadius: 1.5,
        border:
          t.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(15,23,42,0.06)',
        background: t.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
      })}
    >
      <Typography
        variant="overline"
        sx={{ letterSpacing: 1.2, color: 'text.secondary', fontWeight: 700 }}
      >
        Види
      </Typography>
      <Box
        sx={{
          mt: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
        }}
      >
        {(Object.keys(ITEM_KINDS) as Array<keyof typeof ITEM_KINDS>).map((k) => (
          <Stack
            key={k}
            alignItems="center"
            spacing={0.4}
            sx={(t) => ({
              py: 1,
              px: 0.5,
              borderRadius: 0.75,
              background: t.palette.mode === 'dark' ? 'rgba(0,0,0,0.18)' : 'rgba(15,23,42,0.03)',
            })}
          >
            <Box
              sx={{
                height: 76,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ItemSvg kind={k} size={40} />
            </Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, fontSize: '0.78rem', lineHeight: 1.1 }}
            >
              {ITEM_KINDS[k].points} pts
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.65rem', lineHeight: 1.1, textAlign: 'center' }}
            >
              {KIND_LABELS[k]}
              <br />
              {ITEM_KINDS[k].weight}%
            </Typography>
          </Stack>
        ))}
      </Box>
    </Paper>
  )
}

const ToggleRow = ({
  iconOn,
  iconOff,
  label,
  checked,
  onChange,
}: {
  iconOn: ReactNode
  iconOff: ReactNode
  label: string
  checked: boolean
  onChange(value: boolean): void
}) => (
  <Stack direction="row" alignItems="center" spacing={1.5}>
    <Box
      sx={(t) => ({
        width: 32,
        height: 32,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        background: t.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.04)',
      })}
    >
      {checked ? iconOn : iconOff}
    </Box>
    <Typography variant="body2" sx={{ flex: 1, fontWeight: 600 }}>
      {label}
    </Typography>
    <Switch checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </Stack>
)

const SettingsCard = () => {
  const settings = useGameSettings()
  const { updateSettings } = useGameActions()
  const autoEndValue = settings.autoEndEnabled ? settings.autoEndSeconds : 0

  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        p: 1.75,
        borderRadius: 1.5,
        border:
          t.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(15,23,42,0.06)',
        background: t.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
      })}
    >
      <Typography
        variant="overline"
        sx={{ letterSpacing: 1.2, color: 'text.secondary', fontWeight: 700 }}
      >
        Налаштування
      </Typography>

      <Stack spacing={1.75} sx={{ mt: 1 }}>
        <ToggleRow
          iconOn={<VolumeUpIcon fontSize="small" />}
          iconOff={<VolumeOffIcon fontSize="small" />}
          label="Звук"
          checked={settings.soundEnabled}
          onChange={(v) => updateSettings({ soundEnabled: v })}
        />
        <ToggleRow
          iconOn={<VibrationIcon fontSize="small" />}
          iconOff={<VibrationIcon fontSize="small" sx={{ opacity: 0.4 }} />}
          label="Вібрація"
          checked={settings.hapticEnabled}
          onChange={(v) => updateSettings({ hapticEnabled: v })}
        />
        <ToggleRow
          iconOn={<MusicNoteIcon fontSize="small" />}
          iconOff={<MusicOffIcon fontSize="small" />}
          label="Фонова музика (8-bit)"
          checked={settings.musicEnabled}
          onChange={(v) => updateSettings({ musicEnabled: v })}
        />

        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Активний на сторінках
          </Typography>
          <Box sx={{ mt: 0.75 }}>
            <ToggleButtonGroup
              value={settings.scope}
              exclusive
              onChange={(_, v: typeof settings.scope | null) => {
                if (v !== null) {
                  updateSettings({ scope: v })
                }
              }}
              size="small"
              sx={{
                width: '100%',
                gap: 0.75,
                '& .MuiToggleButton-root': {
                  flex: 1,
                  py: 0.75,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px !important',
                  border: (t) =>
                    t.palette.mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.12) !important'
                      : '1px solid rgba(15,23,42,0.12) !important',
                  marginLeft: '0 !important',
                },
              }}
            >
              <ToggleButton value="list-only">Початковий екран</ToggleButton>
              <ToggleButton value="all">Скрізь</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Авто-кінець сесії при бездіяльності
          </Typography>
          <Box sx={{ mt: 0.75 }}>
            <ToggleButtonGroup
              value={autoEndValue}
              exclusive
              onChange={(_, v: number | null) => {
                if (v === null) {
                  return
                }
                if (v === 0) {
                  updateSettings({ autoEndEnabled: false })
                } else {
                  updateSettings({ autoEndEnabled: true, autoEndSeconds: v })
                }
              }}
              size="small"
              sx={{
                width: '100%',
                gap: 0.75,
                '& .MuiToggleButton-root': {
                  flex: 1,
                  py: 0.75,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px !important',
                  border: (t) =>
                    t.palette.mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.12) !important'
                      : '1px solid rgba(15,23,42,0.12) !important',
                  marginLeft: '0 !important',
                },
              }}
            >
              <ToggleButton value={0}>Вимк.</ToggleButton>
              {AUTO_END_PRESETS.map((p) => (
                <ToggleButton key={p.value} value={p.value}>
                  {p.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Stack>
    </Paper>
  )
}

export const GamePage = () => {
  return (
    <TopBottomHome>
      <Stack spacing={2} sx={{ px: { xs: 1.5, sm: 2 }, pb: 2, maxWidth: 720, mx: 'auto' }}>
        <PageTitle />
        <HeroCard />
        <KindsRow />
        <SettingsCard />
        <Leaderboard />
      </Stack>
    </TopBottomHome>
  )
}
