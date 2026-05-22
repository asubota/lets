import { useId } from 'react'

import { ITEM_KINDS } from './config.ts'
import { type ItemKind } from '../../store/game.ts'

type Props = {
  kind: ItemKind
  size?: number
}

type SkinTone = {
  shaftLight: string
  shaftMid: string
  shaftDark: string
  glansLight: string
  glansMid: string
  glansDark: string
  ballLight: string
  ballDark: string
  shadow: string
  highlight: string
  veinTint: string
  baseShadow: string
}

type Proportion = 'normal' | 'long' | 'extraLong'

const SKIN: Record<ItemKind, SkinTone> = {
  common: {
    shaftLight: '#f4cdab',
    shaftMid: '#dba488',
    shaftDark: '#a06848',
    glansLight: '#f0b394',
    glansMid: '#d48870',
    glansDark: '#8e4f3a',
    ballLight: '#dfb090',
    ballDark: '#8a5e44',
    shadow: 'rgba(70, 38, 22, 0.55)',
    highlight: 'rgba(255, 244, 225, 0.6)',
    veinTint: 'rgba(94, 50, 30, 0.18)',
    baseShadow: 'rgba(60, 30, 18, 0.5)',
  },
  uncommon: {
    shaftLight: '#d39a73',
    shaftMid: '#a87148',
    shaftDark: '#6a4126',
    glansLight: '#c98564',
    glansMid: '#995a35',
    glansDark: '#5e3217',
    ballLight: '#b07c5a',
    ballDark: '#603a22',
    shadow: 'rgba(40, 20, 8, 0.55)',
    highlight: 'rgba(255, 220, 190, 0.5)',
    veinTint: 'rgba(60, 30, 14, 0.22)',
    baseShadow: 'rgba(35, 18, 8, 0.55)',
  },
  rare: {
    shaftLight: '#3a2114',
    shaftMid: '#160a05',
    shaftDark: '#000000',
    glansLight: '#2c1a10',
    glansMid: '#0d0604',
    glansDark: '#000000',
    ballLight: '#241509',
    ballDark: '#000000',
    shadow: 'rgba(0, 0, 0, 0.95)',
    highlight: 'rgba(165, 100, 70, 0.32)',
    veinTint: 'rgba(0, 0, 0, 0.6)',
    baseShadow: 'rgba(0, 0, 0, 0.95)',
  },
  rocket: {
    shaftLight: '#fff4b8',
    shaftMid: '#f5b934',
    shaftDark: '#8a5a00',
    glansLight: '#ffe082',
    glansMid: '#d99e1c',
    glansDark: '#6b3f00',
    ballLight: '#f5c641',
    ballDark: '#825100',
    shadow: 'rgba(70, 42, 0, 0.55)',
    highlight: 'rgba(255, 252, 220, 0.85)',
    veinTint: 'rgba(110, 70, 0, 0.18)',
    baseShadow: 'rgba(70, 42, 0, 0.6)',
  },
}

type ShaftPath = {
  d: string
  glansCx: number
  glansCy: number
  glansRx: number
  glansRy: number
  coronaY: number
  midRidgeY: number
  tipCx: number
  tipCy: number
  veinPaths: string[]
  hiX1: number
  hiY1: number
  hiX2: number
  hiY2: number
}

const SHAPES: Record<Proportion, ShaftPath> = {
  normal: {
    d: 'M 34 108 Q 30 78 33 55 Q 36 42 50 40 Q 64 42 67 55 Q 70 78 66 108 Z',
    glansCx: 50,
    glansCy: 42,
    glansRx: 19,
    glansRy: 16,
    coronaY: 50,
    midRidgeY: 56,
    tipCx: 50,
    tipCy: 32,
    veinPaths: [
      'M 39 70 Q 41 85 38 100',
      'M 60 65 Q 62 80 61 100',
      'M 50 60 Q 52 80 49 100',
    ],
    hiX1: 40,
    hiY1: 70,
    hiX2: 44,
    hiY2: 40,
  },
  long: {
    d: 'M 34 108 Q 29 70 31 42 Q 33 26 50 22 Q 67 26 69 42 Q 71 70 66 108 Z',
    glansCx: 50,
    glansCy: 24,
    glansRx: 17,
    glansRy: 14,
    coronaY: 32,
    midRidgeY: 38,
    tipCx: 50,
    tipCy: 16,
    veinPaths: [
      'M 39 50 Q 42 75 38 100',
      'M 60 45 Q 63 75 61 100',
      'M 50 36 Q 53 70 49 100',
    ],
    hiX1: 39,
    hiY1: 60,
    hiX2: 44,
    hiY2: 24,
  },
  extraLong: {
    d: 'M 35 108 Q 29 60 32 30 Q 34 14 50 10 Q 66 14 68 30 Q 71 60 65 108 Z',
    glansCx: 50,
    glansCy: 13,
    glansRx: 15,
    glansRy: 11,
    coronaY: 22,
    midRidgeY: 28,
    tipCx: 50,
    tipCy: 6,
    veinPaths: [
      'M 39 36 Q 42 70 38 100',
      'M 60 32 Q 63 70 61 100',
      'M 50 22 Q 53 65 49 100',
    ],
    hiX1: 39,
    hiY1: 50,
    hiX2: 44,
    hiY2: 14,
  },
}

const Natural = ({
  kind,
  id,
  proportion,
  shiny,
}: {
  kind: ItemKind
  id: string
  proportion: Proportion
  shiny?: boolean
}) => {
  const t = SKIN[kind]
  const s = SHAPES[proportion]
  return (
    <>
      <defs>
        <radialGradient id={`${id}-shaft`} cx="35%" cy="35%" r="80%">
          <stop offset="0%" stopColor={t.shaftLight} />
          <stop offset="50%" stopColor={t.shaftMid} />
          <stop offset="100%" stopColor={t.shaftDark} />
        </radialGradient>
        <radialGradient id={`${id}-glans`} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor={t.glansLight} />
          <stop offset="55%" stopColor={t.glansMid} />
          <stop offset="100%" stopColor={t.glansDark} />
        </radialGradient>
        <radialGradient id={`${id}-ball`} cx="38%" cy="36%" r="70%">
          <stop offset="0%" stopColor={t.ballLight} />
          <stop offset="100%" stopColor={t.ballDark} />
        </radialGradient>
        <linearGradient id={`${id}-base`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={t.baseShadow} stopOpacity="0" />
          <stop offset="100%" stopColor={t.baseShadow} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <ellipse cx="36" cy="119" rx="18" ry="6" fill={t.shadow} opacity="0.25" />
      <ellipse cx="64" cy="119" rx="18" ry="6" fill={t.shadow} opacity="0.25" />

      <ellipse
        cx="36"
        cy="113"
        rx="16"
        ry="13"
        fill={`url(#${id}-ball)`}
        stroke={t.shadow}
        strokeWidth="0.5"
      />
      <ellipse
        cx="64"
        cy="113"
        rx="16"
        ry="13"
        fill={`url(#${id}-ball)`}
        stroke={t.shadow}
        strokeWidth="0.5"
      />
      <path d="M 50 102 Q 53 110 50 120 Q 47 110 50 102 Z" fill={t.shadow} opacity="0.45" />
      <ellipse cx="32" cy="105" rx="3" ry="6" fill={t.highlight} opacity="0.45" />
      <ellipse cx="60" cy="105" rx="3" ry="6" fill={t.highlight} opacity="0.45" />

      <path d={s.d} fill={`url(#${id}-shaft)`} stroke={t.shadow} strokeWidth="0.7" />

      <ellipse cx="50" cy="103" rx="14" ry="6" fill={`url(#${id}-base)`} />

      {s.veinPaths.map((vp) => (
        <path key={vp} d={vp} stroke={t.veinTint} strokeWidth="0.7" fill="none" />
      ))}

      <path
        d={`M 34 ${s.midRidgeY} Q 50 ${s.midRidgeY + 4} 66 ${s.midRidgeY}`}
        stroke={t.shadow}
        strokeWidth="1"
        fill="none"
        opacity="0.45"
      />

      <ellipse
        cx={s.glansCx}
        cy={s.glansCy}
        rx={s.glansRx}
        ry={s.glansRy}
        fill={`url(#${id}-glans)`}
      />

      <path
        d={`M 33 ${s.coronaY} Q 50 ${s.coronaY + 6} 67 ${s.coronaY}`}
        stroke={t.shadow}
        strokeWidth="1.6"
        fill="none"
        opacity="0.7"
      />
      <path
        d={`M 35 ${s.coronaY - 1} Q 50 ${s.coronaY + 4} 65 ${s.coronaY - 1}`}
        stroke={t.highlight}
        strokeWidth="0.8"
        fill="none"
        opacity="0.55"
      />

      <ellipse cx={s.tipCx} cy={s.tipCy} rx="2" ry="3" fill={t.shadow} opacity="0.7" />
      <path
        d={`M ${s.tipCx - 1.5} ${s.tipCy + 2} Q ${s.tipCx} ${s.tipCy + 0.5} ${s.tipCx + 1.5} ${s.tipCy + 2}`}
        stroke={t.highlight}
        strokeWidth="0.6"
        fill="none"
        opacity="0.7"
      />

      <ellipse cx={s.hiX1} cy={s.hiY1} rx="2.4" ry="14" fill={t.highlight} opacity="0.45" />
      <ellipse cx={s.hiX2} cy={s.hiY2} rx="3" ry="4" fill={t.highlight} opacity="0.7" />

      {shiny && (
        <>
          <ellipse
            cx={s.hiX2 - 1}
            cy={s.hiY2 - 1}
            rx="1.2"
            ry="1.6"
            fill="#ffffff"
            opacity="0.95"
          />
          <path
            d={`M ${s.glansCx + 4} ${s.glansCy - 2} l 1 -2 l 0.5 2 l 2 0.5 l -2 0.5 l -0.5 2 l -1 -2 l -2 -0.5 z`}
            fill="#ffffff"
            opacity="0.9"
          />
          <path
            d={`M ${s.hiX1 - 1} ${s.hiY1 + 14} l 0.6 -1.2 l 0.3 1.2 l 1.2 0.3 l -1.2 0.3 l -0.3 1.2 l -0.6 -1.2 l -1.2 -0.3 z`}
            fill="#ffffff"
            opacity="0.85"
          />
          <ellipse
            cx="36"
            cy="108"
            rx="2.5"
            ry="3.5"
            fill="#ffffff"
            opacity="0.55"
          />
          <ellipse
            cx="64"
            cy="108"
            rx="2.5"
            ry="3.5"
            fill="#ffffff"
            opacity="0.55"
          />
        </>
      )}
    </>
  )
}

const proportionFor = (kind: ItemKind): Proportion => {
  if (kind === 'rare') {
    return 'extraLong'
  }
  if (kind === 'rocket') {
    return 'long'
  }
  return 'normal'
}

export const ItemSvg = ({ kind, size }: Props) => {
  const cfg = ITEM_KINDS[kind]
  const finalSize = size ?? cfg.size
  const rawId = useId()
  const id = `gi${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const proportion = proportionFor(kind)
  return (
    <svg
      width={finalSize}
      height={(finalSize * 140) / 100}
      viewBox="0 0 100 140"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))' }}
    >
      <Natural kind={kind} id={id} proportion={proportion} shiny={kind === 'rocket'} />
    </svg>
  )
}
