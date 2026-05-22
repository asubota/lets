import { useMemo, useState } from 'react'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { type ScoreEntry, useGameActions, useGameScores } from '../../store/game.ts'

const pad = (n: number) => String(n).padStart(2, '0')

const formatDate = (ts: number, withYear = false): string => {
  const d = new Date(ts)
  const yearSuffix = withYear ? `.${String(d.getFullYear()).slice(-2)}` : ''
  const date = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}${yearSuffix}`
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`
  return `${date} ${time}`
}

const formatDuration = (start: number, end: number): string => {
  const sec = Math.max(0, Math.round((end - start) / 1000))
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

type SortKey = 'date' | 'score'

const cardBorder = (isBest: boolean, dark: boolean): string => {
  if (isBest) {
    return '1px solid rgba(255, 179, 0, 0.5)'
  }
  return dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,23,42,0.06)'
}

const cardBackground = (isBest: boolean, dark: boolean): string => {
  if (isBest) {
    return dark
      ? 'linear-gradient(135deg, rgba(255,179,0,0.10), rgba(255,179,0,0.04))'
      : 'linear-gradient(135deg, rgba(255,179,0,0.18), rgba(255,179,0,0.06))'
  }
  return dark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)'
}

const ScoreCard = ({ entry, isBest }: { entry: ScoreEntry; isBest: boolean }) => {
  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        p: 1.5,
        borderRadius: 3,
        border: cardBorder(isBest, t.palette.mode === 'dark'),
        background: cardBackground(isBest, t.palette.mode === 'dark'),
      })}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {isBest && (
          <EmojiEventsIcon sx={{ color: '#ffb300', fontSize: 28, flexShrink: 0 }} />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '1.4rem',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
              color: isBest ? '#ffb300' : 'text.primary',
            }}
          >
            {entry.score}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            {formatDate(entry.endedAt)} · {formatDuration(entry.startedAt, entry.endedAt)}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1 }}>
              👑
            </Typography>
            <Typography sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
              {entry.hits.rocket}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1 }}>
              combo
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>×{entry.bestCombo}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  )
}

export const Leaderboard = () => {
  const scores = useGameScores()
  const { clearScores } = useGameActions()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [confirmOpen, setConfirmOpen] = useState(false)

  const sorted = useMemo(() => {
    const list = [...scores]
    if (sortKey === 'score') {
      list.sort((a, b) => b.score - a.score)
    } else {
      list.sort((a, b) => b.endedAt - a.endedAt)
    }
    return list
  }, [scores, sortKey])

  const bestId = useMemo<string | null>(() => {
    if (scores.length === 0) {
      return null
    }
    return [...scores].sort((a, b) => b.score - a.score)[0].id
  }, [scores])

  if (scores.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          textAlign: 'center',
          border: (t) =>
            t.palette.mode === 'dark'
              ? '1px dashed rgba(255,255,255,0.1)'
              : '1px dashed rgba(15,23,42,0.1)',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Поки що порожньо. Увімкни режим і починай ловити.
        </Typography>
      </Paper>
    )
  }

  const visible = isMobile ? sorted.slice(0, 20) : sorted

  return (
    <>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mb: 1.5, px: 0.5 }}
        >
          <EmojiEventsIcon sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, flex: 1 }}>
            Рейтинг
          </Typography>
          <ToggleButtonGroup
            value={sortKey}
            exclusive
            size="small"
            onChange={(_, v: SortKey | null) => {
              if (v !== null) {
                setSortKey(v)
              }
            }}
            sx={{
              '& .MuiToggleButton-root': {
                py: 0.25,
                px: 1,
                textTransform: 'none',
                fontSize: '0.75rem',
              },
            }}
          >
            <ToggleButton value="date">дата</ToggleButton>
            <ToggleButton value="score">очки</ToggleButton>
          </ToggleButtonGroup>
          <Button
            size="small"
            color="inherit"
            sx={{ color: 'text.secondary', minWidth: 0 }}
            onClick={() => setConfirmOpen(true)}
          >
            <DeleteSweepIcon fontSize="small" />
          </Button>
        </Stack>

        <Stack spacing={1}>
          {visible.map((entry) => (
            <ScoreCard key={entry.id} entry={entry} isBest={entry.id === bestId} />
          ))}
        </Stack>

        {isMobile && sorted.length > visible.length && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 1 }}
          >
            ще {sorted.length - visible.length} результатів
          </Typography>
        )}
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Очистити рейтинг?</DialogTitle>
        <DialogContent>
          <Typography>Усі результати буде видалено без можливості відновлення.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Скасувати</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              clearScores()
              setConfirmOpen(false)
            }}
          >
            Очистити
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export const buildLeaderboardSummary = (scores: ScoreEntry[]) => {
  if (scores.length === 0) {
    return { best: 0, totalTaps: 0, totalRockets: 0, sessions: 0 }
  }
  const best = scores.reduce((m, s) => Math.max(m, s.score), 0)
  const totalTaps = scores.reduce(
    (sum, s) => sum + s.hits.common + s.hits.uncommon + s.hits.rare + s.hits.rocket,
    0,
  )
  const totalRockets = scores.reduce((sum, s) => sum + s.hits.rocket, 0)
  return { best, totalTaps, totalRockets, sessions: scores.length }
}
