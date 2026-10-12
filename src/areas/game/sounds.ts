import { getAudioContext } from './audio.ts'
import { type ItemKind, getGameSnapshot } from '../../store/game.ts'

type OscType = 'sine' | 'square' | 'sawtooth' | 'triangle'

// eslint-disable-next-line sonarjs/pseudo-random
const rand = () => Math.random()

const tone = (c: AudioContext, freq: number, durationMs: number, type: OscType, gain = 0.06, delay = 0) => {
  const start = c.currentTime + delay / 1000
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(gain, start)
  g.gain.exponentialRampToValueAtTime(0.0001, start + durationMs / 1000)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(start)
  osc.stop(start + durationMs / 1000)
}

const gliss = (
  c: AudioContext,
  fromFreq: number,
  toFreq: number,
  durationMs: number,
  type: OscType = 'sawtooth',
  gain = 0.08,
  delay = 0,
) => {
  const start = c.currentTime + delay / 1000
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(fromFreq, start)
  osc.frequency.exponentialRampToValueAtTime(toFreq, start + durationMs / 1000)
  g.gain.setValueAtTime(gain, start)
  g.gain.exponentialRampToValueAtTime(0.0001, start + durationMs / 1000)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(start)
  osc.stop(start + durationMs / 1000)
}

const noise = (c: AudioContext, durationMs: number, gain = 0.04, delay = 0) => {
  const start = c.currentTime + delay / 1000
  const length_ = Math.max(1, Math.floor(c.sampleRate * (durationMs / 1000)))
  const buf = c.createBuffer(1, length_, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let index = 0; index < data.length; index++) {
    data[index] = rand() * 2 - 1
  }
  const source = c.createBufferSource()
  source.buffer = buf
  const g = c.createGain()
  g.gain.setValueAtTime(gain, start)
  g.gain.exponentialRampToValueAtTime(0.0001, start + durationMs / 1000)
  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1200
  source.connect(filter)
  filter.connect(g)
  g.connect(c.destination)
  source.start(start)
}

const COMMON_VARIANTS = [
  [{ freq: 520, dur: 60, type: 'sine' as OscType, gain: 0.05 }],
  [{ freq: 600, dur: 50, type: 'sine' as OscType, gain: 0.05 }],
  [{ freq: 460, dur: 70, type: 'triangle' as OscType, gain: 0.05 }],
  [
    { freq: 520, dur: 50, type: 'sine' as OscType, gain: 0.045, delay: 0 },
    { freq: 780, dur: 60, type: 'sine' as OscType, gain: 0.035, delay: 30 },
  ],
]

const UNCOMMON_VARIANTS = [
  [
    { freq: 660, dur: 80, type: 'triangle' as OscType, gain: 0.06, delay: 0 },
    { freq: 990, dur: 70, type: 'sine' as OscType, gain: 0.04, delay: 40 },
  ],
  [
    { freq: 580, dur: 70, type: 'triangle' as OscType, gain: 0.06, delay: 0 },
    { freq: 870, dur: 80, type: 'sine' as OscType, gain: 0.04, delay: 50 },
  ],
  [
    { freq: 740, dur: 60, type: 'triangle' as OscType, gain: 0.06, delay: 0 },
    { freq: 1110, dur: 70, type: 'sine' as OscType, gain: 0.04, delay: 35 },
  ],
]

const RARE_ARPEGGIOS: number[][] = [
  [523, 659, 784, 1047],
  [440, 554, 659, 880],
  [392, 523, 659, 784],
  [587, 740, 880, 1175],
]

const pickFrom = <T>(array: T[]): T => {
  const item = array[Math.floor(rand() * array.length)]
  if (item === undefined) {
    throw new Error('pickFrom() called with an empty array')
  }
  return item
}

const playCommonHit = (c: AudioContext) => {
  const variant = pickFrom(COMMON_VARIANTS)
  for (const n of variant) {
    tone(c, n.freq, n.dur, n.type, n.gain, 'delay' in n ? n.delay : 0)
  }
}

const playUncommonHit = (c: AudioContext) => {
  const variant = pickFrom(UNCOMMON_VARIANTS)
  for (const n of variant) {
    tone(c, n.freq, n.dur, n.type, n.gain, n.delay)
  }
}

const playRareHit = (c: AudioContext) => {
  const notes = pickFrom(RARE_ARPEGGIOS)
  for (const [index, f] of notes.entries()) {
    tone(c, f, 70 + index * 10, 'triangle', 0.05 - index * 0.005, index * 50)
  }
}

const playRocketHit = (c: AudioContext) => {
  noise(c, 90, 0.05, 0)
  gliss(c, 180, 1800, 420, 'sawtooth', 0.07, 20)
  gliss(c, 1800, 700, 260, 'sawtooth', 0.05, 220)
  tone(c, 2200, 80, 'triangle', 0.05, 380)
  tone(c, 1100, 120, 'sine', 0.04, 420)
  tone(c, 3300, 50, 'sine', 0.025, 460)
}

export const playHit = (kind: ItemKind) => {
  if (!getGameSnapshot().settings.soundEnabled) {
    return
  }
  const c = getAudioContext()
  if (!c) {
    return
  }
  switch (kind) {
    case 'rocket': {
      playRocketHit(c)

      break
    }
    case 'rare': {
      playRareHit(c)

      break
    }
    case 'uncommon': {
      playUncommonHit(c)

      break
    }
    default: {
      playCommonHit(c)
    }
  }
}

export const playComboLevelUp = (level: 2 | 3) => {
  if (!getGameSnapshot().settings.soundEnabled) {
    return
  }
  const c = getAudioContext()
  if (!c) {
    return
  }
  if (level === 2) {
    tone(c, 1320, 80, 'square', 0.05)
    tone(c, 1760, 90, 'triangle', 0.04, 60)
  } else {
    tone(c, 1760, 80, 'square', 0.05)
    tone(c, 2200, 90, 'triangle', 0.045, 50)
    tone(c, 2640, 110, 'sine', 0.04, 110)
  }
}

export const playEndSession = () => {
  if (!getGameSnapshot().settings.soundEnabled) {
    return
  }
  const c = getAudioContext()
  if (!c) {
    return
  }
  const base = pickFrom([440, 392, 523])
  tone(c, base, 140, 'sine', 0.05)
  tone(c, base * 0.75, 200, 'sine', 0.05, 100)
}

export const playMiss = () => {
  if (!getGameSnapshot().settings.soundEnabled) {
    return
  }
  const c = getAudioContext()
  if (!c) {
    return
  }
  noise(c, 40, 0.02)
}
