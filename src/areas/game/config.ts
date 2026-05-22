import { type ItemKind } from '../../store/game.ts'

export type KindConfig = {
  points: number
  weight: number
  color: string
  size: number
  speedMul: number
  rotateRange: [number, number]
  amplitudeRange: [number, number]
}

export const ITEM_KINDS: Record<ItemKind, KindConfig> = {
  common: {
    points: 1,
    weight: 60,
    color: '#9c5bbf',
    size: 40,
    speedMul: 1,
    rotateRange: [-30, 30],
    amplitudeRange: [10, 25],
  },
  uncommon: {
    points: 3,
    weight: 25,
    color: '#43a047',
    size: 46,
    speedMul: 1.15,
    rotateRange: [-50, 50],
    amplitudeRange: [15, 35],
  },
  rare: {
    points: 10,
    weight: 12,
    color: '#fbc02d',
    size: 52,
    speedMul: 1.4,
    rotateRange: [-90, 90],
    amplitudeRange: [25, 50],
  },
  rocket: {
    points: 50,
    weight: 3,
    color: '#ea2b06',
    size: 58,
    speedMul: 1.85,
    rotateRange: [-120, 120],
    amplitudeRange: [10, 30],
  },
}

export const SPAWN_BASE_INTERVAL_MS = 1500
export const MAX_CONCURRENT = 7
export const COMBO_WINDOW_MS = 1500
export const COMBO_MULT_THRESHOLD_2X = 5
export const COMBO_MULT_THRESHOLD_1_5X = 3

export const pickKind = (): ItemKind => {
  const total = Object.values(ITEM_KINDS).reduce((s, k) => s + k.weight, 0)
  // eslint-disable-next-line sonarjs/pseudo-random
  let r = Math.random() * total
  for (const key of Object.keys(ITEM_KINDS) as ItemKind[]) {
    r -= ITEM_KINDS[key].weight
    if (r <= 0) {
      return key
    }
  }
  return 'common'
}

export const getMultiplier = (combo: number): number => {
  if (combo >= COMBO_MULT_THRESHOLD_2X) {
    return 2
  }
  if (combo >= COMBO_MULT_THRESHOLD_1_5X) {
    return 1.5
  }
  return 1
}
