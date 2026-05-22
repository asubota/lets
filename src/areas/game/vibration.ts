import { getAudioContext, hasNativeVibrate } from './audio.ts'
import { type ItemKind, getGameSnapshot } from '../../store/game.ts'

const KIND_PATTERNS: Record<ItemKind, number[]> = {
  common: [14],
  uncommon: [22, 8, 14],
  rare: [40, 20, 40],
  rocket: [80, 30, 80, 30, 120],
}

const COMBO_TAIL: Record<2 | 3, number[]> = {
  2: [0, 24, 12, 36],
  3: [0, 18, 10, 30, 10, 60],
}

const THUMP_FREQ_BY_KIND: Record<ItemKind, number> = {
  common: 55,
  uncommon: 48,
  rare: 42,
  rocket: 36,
}

const THUMP_PEAK_BY_KIND: Record<ItemKind, number> = {
  common: 0.22,
  uncommon: 0.3,
  rare: 0.4,
  rocket: 0.55,
}

const tryNativeVibrate = (pattern: number[]) => {
  try {
    navigator.vibrate(pattern)
  } catch {
    /* ignore */
  }
}

const scheduleThump = (
  c: AudioContext,
  startTime: number,
  freq: number,
  durationMs: number,
  peak: number,
) => {
  const durationS = durationMs / 1000
  const osc = c.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq * 1.6, startTime)
  osc.frequency.exponentialRampToValueAtTime(freq, startTime + Math.min(0.04, durationS))
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, startTime)
  g.gain.exponentialRampToValueAtTime(peak, startTime + 0.005)
  g.gain.exponentialRampToValueAtTime(0.0001, startTime + durationS + 0.02)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(startTime)
  osc.stop(startTime + durationS + 0.05)
}

const playAudioHaptic = (kind: ItemKind, comboLevel: 0 | 2 | 3) => {
  const c = getAudioContext()
  if (!c) {
    return
  }
  const pattern = [...KIND_PATTERNS[kind]]
  if (comboLevel === 2 || comboLevel === 3) {
    pattern.push(...COMBO_TAIL[comboLevel])
  }
  const baseFreq = THUMP_FREQ_BY_KIND[kind]
  const peak = THUMP_PEAK_BY_KIND[kind]
  let elapsedMs = 0
  for (let i = 0; i < pattern.length; i++) {
    const durationMs = pattern[i]
    if (i % 2 === 0 && durationMs > 0) {
      const startTime = c.currentTime + elapsedMs / 1000
      scheduleThump(c, startTime, baseFreq, durationMs, peak)
    }
    elapsedMs += durationMs
  }
}

export const vibrateForHit = (kind: ItemKind, comboLevel: 0 | 2 | 3) => {
  if (!getGameSnapshot().settings.hapticEnabled) {
    return
  }
  if (hasNativeVibrate()) {
    const pattern = [...KIND_PATTERNS[kind]]
    if (comboLevel === 2 || comboLevel === 3) {
      pattern.push(...COMBO_TAIL[comboLevel])
    }
    tryNativeVibrate(pattern)
    return
  }
  // Fallback for iOS Safari / PWA where Vibration API is not supported:
  // play sub-bass thumps that are felt through the phone speakers.
  playAudioHaptic(kind, comboLevel)
}
