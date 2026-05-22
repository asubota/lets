export type TrajectoryKind = 'sine' | 'zigzag' | 'spiral' | 'loop' | 'chaos' | 'pendulum'

export const ALL_TRAJECTORIES: TrajectoryKind[] = [
  'sine',
  'zigzag',
  'spiral',
  'loop',
  'chaos',
  'pendulum',
]

export type TrajectoryParams = {
  kind: TrajectoryKind
  startX: number
  startY: number
  endX: number
  endY: number
  duration: number
  amplitude: number
  frequency: number
  phaseOffset: number
}

export type Position = { x: number; y: number }

const computePerpendicular = (dx: number, dy: number) => {
  const len = Math.hypot(dx, dy) || 1
  return { perpX: -dy / len, perpY: dx / len }
}

export const computePosition = (params: TrajectoryParams, elapsed: number): Position => {
  const t = Math.min(1, elapsed / params.duration)
  const baseX = params.startX + (params.endX - params.startX) * t
  const baseY = params.startY + (params.endY - params.startY) * t
  const dx = params.endX - params.startX
  const dy = params.endY - params.startY
  const { perpX, perpY } = computePerpendicular(dx, dy)
  const time = elapsed / 1000
  const phase = time * params.frequency * Math.PI * 2 + params.phaseOffset

  if (params.kind === 'sine') {
    const offset = Math.sin(phase) * params.amplitude
    return { x: baseX + perpX * offset, y: baseY + perpY * offset }
  }
  if (params.kind === 'zigzag') {
    const zig = (2 / Math.PI) * Math.asin(Math.sin(phase))
    const offset = zig * params.amplitude
    return { x: baseX + perpX * offset, y: baseY + perpY * offset }
  }
  if (params.kind === 'spiral') {
    const r = params.amplitude * (0.6 + t * 0.4)
    return { x: baseX + Math.cos(phase) * r, y: baseY + Math.sin(phase) * r }
  }
  if (params.kind === 'loop') {
    const envelope = Math.sin(t * Math.PI)
    const r = params.amplitude * 1.6 * envelope
    return {
      x: baseX + Math.cos(phase) * r,
      y: baseY + Math.sin(phase) * r,
    }
  }
  if (params.kind === 'chaos') {
    const a = Math.sin(phase) * params.amplitude
    const b = Math.cos(phase * 1.73 + 1.1) * params.amplitude * 0.7
    const c = Math.sin(phase * 0.41 + 2.3) * params.amplitude * 0.55
    return {
      x: baseX + perpX * a + b,
      y: baseY + perpY * a + c,
    }
  }
  // pendulum: slows mid-flight, swings sideways
  const swing = Math.sin(phase * 0.6) * params.amplitude * (1 - Math.abs(t - 0.5) * 2)
  const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  const px = params.startX + (params.endX - params.startX) * easeT
  const py = params.startY + (params.endY - params.startY) * easeT
  return { x: px + perpX * swing, y: py + perpY * swing }
}

export const pickTrajectory = (rand: () => number): TrajectoryKind => {
  const i = Math.floor(rand() * ALL_TRAJECTORIES.length)
  return ALL_TRAJECTORIES[i] ?? 'sine'
}
