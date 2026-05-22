import { getAudioContext } from './audio.ts'
import { getGameSnapshot } from '../../store/game.ts'

type OscType = 'sine' | 'square' | 'sawtooth' | 'triangle'

let masterGain: GainNode | null = null
let sessionGain: GainNode | null = null
let sessionId = 0
let loopTimer: number | null = null
let nextStartTime = 0

const BPM = 138
const BEAT_S = 60 / BPM
const STEP_S = BEAT_S / 2 // 8th note
const STEPS_PER_BAR = 8
const BARS = 4
const PATTERN_S = STEPS_PER_BAR * BARS * STEP_S

const BASS_ROOTS = [55, 43.65, 49, 55] // A1, F1, G1, A1

const LEAD_BARS: number[][] = [
  [440, 523.25, 659.25, 880, 659.25, 523.25, 440, 329.63],
  [349.23, 440, 523.25, 698.46, 523.25, 440, 349.23, 261.63],
  [392, 493.88, 587.33, 783.99, 587.33, 493.88, 392, 293.66],
  [440, 523.25, 659.25, 880, 659.25, 523.25, 440, 329.63],
]

const ARP_BARS: number[][] = [
  [880, 1046.5, 1318.5, 1760, 1318.5, 1046.5, 880, 659.25],
  [698.46, 880, 1046.5, 1396.91, 1046.5, 880, 698.46, 523.25],
  [783.99, 987.77, 1174.66, 1567.98, 1174.66, 987.77, 783.99, 587.33],
  [880, 1046.5, 1318.5, 1760, 1318.5, 1046.5, 880, 659.25],
]

// eslint-disable-next-line sonarjs/pseudo-random
const rnd = () => Math.random()

const getMusicCtx = (): AudioContext | null => {
  const c = getAudioContext()
  if (c === null) {
    return null
  }
  if (masterGain === null) {
    masterGain = c.createGain()
    masterGain.gain.value = 0.18
    masterGain.connect(c.destination)
  }
  return c
}

const env = (
  c: AudioContext,
  out: AudioNode,
  startTime: number,
  durationS: number,
  peak: number,
): GainNode => {
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, startTime)
  g.gain.exponentialRampToValueAtTime(peak, startTime + 0.005)
  g.gain.exponentialRampToValueAtTime(peak * 0.6, startTime + 0.05)
  g.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(durationS, 0.05))
  g.connect(out)
  return g
}

const scheduleTone = (
  c: AudioContext,
  out: AudioNode,
  freq: number,
  startTime: number,
  durationS: number,
  type: OscType,
  peak: number,
) => {
  const osc = c.createOscillator()
  osc.type = type
  osc.frequency.value = freq
  if (type === 'square') {
    osc.detune.value = (rnd() - 0.5) * 6
  }
  const g = env(c, out, startTime, durationS, peak)
  osc.connect(g)
  osc.start(startTime)
  osc.stop(startTime + durationS + 0.05)
}

const scheduleNoise = (
  c: AudioContext,
  out: AudioNode,
  startTime: number,
  durationS: number,
  peak: number,
  filterHz: number,
) => {
  const sampleRate = c.sampleRate
  const len = Math.max(1, Math.floor(sampleRate * durationS))
  const buf = c.createBuffer(1, len, sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) {
    data[i] = rnd() * 2 - 1
  }
  const src = c.createBufferSource()
  src.buffer = buf
  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = filterHz
  const g = env(c, out, startTime, durationS, peak)
  src.connect(filter)
  filter.connect(g)
  src.start(startTime)
}

const scheduleLaserZap = (c: AudioContext, out: AudioNode, startTime: number) => {
  const osc = c.createOscillator()
  osc.type = 'square'
  osc.frequency.setValueAtTime(1800, startTime)
  osc.frequency.exponentialRampToValueAtTime(120, startTime + 0.12)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, startTime)
  g.gain.exponentialRampToValueAtTime(0.06, startTime + 0.005)
  g.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.13)
  osc.connect(g)
  g.connect(out)
  osc.start(startTime)
  osc.stop(startTime + 0.16)
}

const scheduleHatRoll = (c: AudioContext, out: AudioNode, startTime: number) => {
  for (let i = 0; i < 4; i++) {
    scheduleNoise(c, out, startTime + i * 0.06, 0.035, 0.04, 9500)
  }
}

const scheduleVoxStab = (c: AudioContext, out: AudioNode, startTime: number) => {
  const notes = [261.63, 329.63, 392]
  for (const f of notes) {
    scheduleTone(c, out, f, startTime, 0.18, 'sawtooth', 0.04)
    scheduleTone(c, out, f * 2, startTime, 0.18, 'square', 0.025)
  }
}

const scheduleArpRun = (c: AudioContext, out: AudioNode, startTime: number, barIndex: number) => {
  const seq = ARP_BARS[barIndex]
  for (let i = 0; i < 8; i++) {
    scheduleTone(c, out, seq[i] * 2, startTime + i * (STEP_S / 2), STEP_S / 2, 'triangle', 0.035)
  }
}

const scheduleBassDrop = (c: AudioContext, out: AudioNode, startTime: number) => {
  const osc = c.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(110, startTime)
  osc.frequency.exponentialRampToValueAtTime(30, startTime + 0.35)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, startTime)
  g.gain.exponentialRampToValueAtTime(0.16, startTime + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4)
  osc.connect(g)
  g.connect(out)
  osc.start(startTime)
  osc.stop(startTime + 0.45)
}

const scheduleAccent = (c: AudioContext, out: AudioNode, barStart: number, barIndex: number) => {
  const r = rnd()
  if (r < 0.22) {
    scheduleLaserZap(c, out, barStart + STEP_S * 7)
  } else if (r < 0.4) {
    scheduleHatRoll(c, out, barStart + STEP_S * 6)
  } else if (r < 0.55) {
    scheduleVoxStab(c, out, barStart)
  } else if (r < 0.68) {
    scheduleArpRun(c, out, barStart, barIndex)
  } else if (r < 0.78) {
    scheduleBassDrop(c, out, barStart)
  }
  // ~22% chance: no accent (mostly first/quiet bars)
}

const scheduleBar = (
  c: AudioContext,
  out: AudioNode,
  barStart: number,
  barIndex: number,
  patternIndex: number,
) => {
  const bassRoot = BASS_ROOTS[barIndex]
  const lead = LEAD_BARS[barIndex]
  const arp = ARP_BARS[barIndex]

  for (let step = 0; step < STEPS_PER_BAR; step++) {
    const t = barStart + step * STEP_S
    const bassFreq = step % 2 === 0 ? bassRoot : bassRoot * 2
    scheduleTone(c, out, bassFreq, t, STEP_S * 0.9, 'square', 0.16)
    scheduleTone(c, out, lead[step], t, STEP_S * 0.8, 'square', 0.09)
    if (step % 4 === 0) {
      scheduleTone(c, out, arp[step], t, STEP_S * 0.5, 'triangle', 0.05)
    }
    if (step === 0 || step === 4) {
      scheduleTone(c, out, 60, t, 0.1, 'sine', 0.3)
      scheduleNoise(c, out, t, 0.04, 0.12, 1200)
    }
    if (step === 2 || step === 6) {
      scheduleNoise(c, out, t, 0.08, 0.12, 5500)
    }
    scheduleNoise(c, out, t, 0.025, 0.045, 9000)
  }

  // Accents start kicking in after the first bar; rotate variety
  if (patternIndex > 0 || barIndex >= 2) {
    scheduleAccent(c, out, barStart, barIndex)
  }
}

let patternCounter = 0

const scheduleLoop = (capturedSessionId: number, gain: GainNode) => {
  if (capturedSessionId !== sessionId) {
    return
  }
  const c = getMusicCtx()
  if (!c) {
    return
  }

  const startTime = nextStartTime > 0 ? nextStartTime : c.currentTime + 0.1
  for (let bar = 0; bar < BARS; bar++) {
    scheduleBar(c, gain, startTime + bar * STEPS_PER_BAR * STEP_S, bar, patternCounter)
  }
  patternCounter++
  nextStartTime = startTime + PATTERN_S

  const aheadMs = Math.max(50, (PATTERN_S - 0.3) * 1000)
  loopTimer = window.setTimeout(() => scheduleLoop(capturedSessionId, gain), aheadMs)
}

export const startMusic = () => {
  if (sessionGain) {
    return
  }
  if (!getGameSnapshot().settings.musicEnabled) {
    return
  }
  const c = getMusicCtx()
  if (!c || !masterGain) {
    return
  }

  sessionId++
  const id = sessionId
  patternCounter = 0
  nextStartTime = 0

  const gain = c.createGain()
  gain.gain.setValueAtTime(0.0001, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(1, c.currentTime + 0.4)
  gain.connect(masterGain)
  sessionGain = gain

  scheduleLoop(id, gain)
}

export const stopMusic = () => {
  sessionId++
  if (loopTimer !== null) {
    window.clearTimeout(loopTimer)
    loopTimer = null
  }
  const c = getAudioContext()
  if (sessionGain && c) {
    const g = sessionGain
    sessionGain = null
    const now = c.currentTime
    g.gain.cancelScheduledValues(now)
    g.gain.setValueAtTime(g.gain.value, now)
    g.gain.linearRampToValueAtTime(0.0001, now + 0.2)
    window.setTimeout(() => {
      try {
        g.disconnect()
      } catch {
        /* ignore */
      }
    }, 280)
  }
  nextStartTime = 0
}
