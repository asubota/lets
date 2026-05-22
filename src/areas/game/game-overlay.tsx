import { useCallback, useEffect, useRef, useState } from 'react'

import { useRouterState } from '@tanstack/react-router'

import {
  COMBO_MULT_THRESHOLD_1_5X,
  COMBO_MULT_THRESHOLD_2X,
  COMBO_WINDOW_MS,
  ITEM_KINDS,
  MAX_CONCURRENT,
  SPAWN_BASE_INTERVAL_MS,
  getMultiplier,
  pickKind,
} from './config.ts'
import { FlyingItem } from './flying-item.tsx'
import { GameHud } from './game-hud.tsx'
import { startMusic, stopMusic } from './music.ts'
import { ScorePopup, type ScorePopupData } from './score-popup.tsx'
import { playComboLevelUp, playEndSession, playHit } from './sounds.ts'
import { type TrajectoryKind, pickTrajectory } from './trajectory.ts'
import { vibrateForHit } from './vibration.ts'
import {
  type GameSettings,
  type ItemKind,
  getGameSnapshot,
  useGameActions,
  useGameMode,
  useGameSettings,
  useSessionStartedAt,
} from '../../store/game.ts'

type SpawnData = {
  id: number
  kind: ItemKind
  trajectory: TrajectoryKind
  startX: number
  startY: number
  endX: number
  endY: number
  duration: number
  rotateSpeed: number
  amplitude: number
  frequency: number
  phaseOffset: number
}

// eslint-disable-next-line sonarjs/pseudo-random
const rand = (min: number, max: number) => min + Math.random() * (max - min)
// eslint-disable-next-line sonarjs/pseudo-random
const randFn = () => Math.random()

const buildSpawn = (id: number, w: number, h: number): SpawnData => {
  const kind = pickKind()
  const cfg = ITEM_KINDS[kind]
  const trajectory = pickTrajectory(randFn)
  // eslint-disable-next-line sonarjs/pseudo-random
  const edge = Math.floor(Math.random() * 4)
  const margin = 100
  let startX = 0
  let startY = 0
  let endX = 0
  let endY = 0
  if (edge === 0) {
    startX = rand(0, w)
    startY = -margin
    endX = rand(0, w)
    endY = h + margin
  } else if (edge === 1) {
    startX = w + margin
    startY = rand(0, h)
    endX = -margin
    endY = rand(0, h)
  } else if (edge === 2) {
    startX = rand(0, w)
    startY = h + margin
    endX = rand(0, w)
    endY = -margin
  } else {
    startX = -margin
    startY = rand(0, h)
    endX = w + margin
    endY = rand(0, h)
  }
  const distance = Math.hypot(endX - startX, endY - startY)
  const baseSpeed = 125
  const speedJitter = rand(0.9, 1.15)
  const speed = baseSpeed * cfg.speedMul * speedJitter
  const duration = (distance / speed) * 1000
  const rotateSpeed = rand(cfg.rotateRange[0], cfg.rotateRange[1])
  let amplitudeBase = rand(cfg.amplitudeRange[0], cfg.amplitudeRange[1])
  let frequency = rand(0.4, 1.1)

  if (trajectory === 'zigzag') {
    frequency = rand(0.8, 1.6)
    amplitudeBase *= 0.9
  } else if (trajectory === 'spiral') {
    amplitudeBase = rand(40, 80)
    frequency = rand(0.6, 1.4)
  } else if (trajectory === 'loop') {
    amplitudeBase = rand(50, 90)
    frequency = rand(0.8, 1.5)
  } else if (trajectory === 'chaos') {
    amplitudeBase = rand(30, 70)
    frequency = rand(0.5, 1.3)
  } else if (trajectory === 'pendulum') {
    amplitudeBase = rand(40, 90)
    frequency = rand(0.3, 0.7)
  }

  const phaseOffset = rand(0, Math.PI * 2)

  return {
    id,
    kind,
    trajectory,
    startX,
    startY,
    endX,
    endY,
    duration,
    rotateSpeed,
    amplitude: amplitudeBase,
    frequency,
    phaseOffset,
  }
}

let spawnSeq = 1
let popupSeq = 1

// MUI sets `MuiModal-open` on document.body while any Modal/Dialog is open.
// Watch the body class once via MutationObserver instead of querying on each spawn.
let modalOpenCached = false
let modalObserver: MutationObserver | null = null

const ensureModalWatcher = () => {
  if (modalObserver !== null || typeof document === 'undefined') {
    return
  }
  const refresh = () => {
    modalOpenCached = document.body.classList.contains('MuiModal-open')
  }
  refresh()
  modalObserver = new MutationObserver(refresh)
  modalObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

const isModalOpen = (): boolean => {
  ensureModalWatcher()
  return modalOpenCached
}

type InnerProps = {
  settings: GameSettings
}

const GameOverlayInner = ({ settings }: InnerProps) => {
  const sessionStartedAt = useSessionStartedAt()
  const { recordHit, endSession } = useGameActions()

  const [items, setItems] = useState<SpawnData[]>([])
  const [popups, setPopups] = useState<ScorePopupData[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const lastComboLevelRef = useRef(0)

  useEffect(() => {
    const update = () => {
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleExpire = useCallback((id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }, [])

  const handlePopupDone = useCallback((id: number) => {
    setPopups((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const handleHit = useCallback(
    (kind: ItemKind, id: number, x: number, y: number) => {
      const cfg = ITEM_KINDS[kind]
      const snap = getGameSnapshot()
      const isCombo = Date.now() - snap.lastHitAt <= COMBO_WINDOW_MS
      const nextCombo = isCombo ? snap.currentCombo + 1 : 1
      const mult = getMultiplier(nextCombo)
      const points = Math.round(cfg.points * mult)
      recordHit(kind, points, nextCombo)
      playHit(kind)
      let comboLevel: 0 | 2 | 3 = 0
      if (nextCombo >= COMBO_MULT_THRESHOLD_2X) {
        comboLevel = 3
      } else if (nextCombo >= COMBO_MULT_THRESHOLD_1_5X) {
        comboLevel = 2
      }
      const isNewLevel =
        (nextCombo === COMBO_MULT_THRESHOLD_1_5X || nextCombo === COMBO_MULT_THRESHOLD_2X)
        && comboLevel !== lastComboLevelRef.current
      if (isNewLevel && comboLevel !== 0) {
        lastComboLevelRef.current = comboLevel
        playComboLevelUp(comboLevel)
      }
      if (!isCombo) {
        lastComboLevelRef.current = 0
      }
      vibrateForHit(kind, comboLevel)
      const popupId = popupSeq++
      const text = mult > 1 ? `+${points} ×${mult}` : `+${points}`
      setPopups((prev) => [...prev, { id: popupId, x, y, text, color: cfg.color }])
      setItems((prev) => prev.filter((it) => it.id !== id))
    },
    [recordHit],
  )

  useEffect(() => {
    let timeoutId: number | null = null

    const appendSpawn = (prev: SpawnData[]): SpawnData[] => {
      if (prev.length >= MAX_CONCURRENT) {
        return prev
      }
      const { w, h } = sizeRef.current
      return [...prev, buildSpawn(spawnSeq++, w, h)]
    }

    const trySpawn = () => {
      if (document.hidden || isModalOpen()) {
        return
      }
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) {
        return
      }
      setItems(appendSpawn)
    }

    const schedule = () => {
      const interval = SPAWN_BASE_INTERVAL_MS * rand(0.85, 1.2)
      timeoutId = window.setTimeout(() => {
        trySpawn()
        schedule()
      }, interval)
    }
    schedule()
    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    if (!settings.autoEndEnabled || sessionStartedAt === null) {
      return
    }
    const id = window.setInterval(() => {
      const snap = getGameSnapshot()
      if (snap.sessionStartedAt === null) {
        return
      }
      const idle = Date.now() - snap.lastHitAt
      if (idle >= settings.autoEndSeconds * 1000) {
        playEndSession()
        endSession()
      }
    }, 1000)
    return () => window.clearInterval(id)
  }, [settings.autoEndEnabled, settings.autoEndSeconds, sessionStartedAt, endSession])

  useEffect(() => {
    if (settings.musicEnabled) {
      startMusic()
    } else {
      stopMusic()
    }
  }, [settings.musicEnabled])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        // Drop in-flight items so they don't "teleport" or expire en masse on resume.
        setItems([])
        // Pause music so AudioContext doesn't fire a burst of queued notes when it resumes.
        stopMusic()
      } else if (settings.musicEnabled) {
        startMusic()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [settings.musicEnabled])

  useEffect(() => {
    return () => {
      stopMusic()
    }
  }, [])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1300,
          overflow: 'hidden',
        }}
      >
        {items.map((it) => (
          <FlyingItem
            key={it.id}
            id={it.id}
            kind={it.kind}
            trajectory={it.trajectory}
            startX={it.startX}
            startY={it.startY}
            endX={it.endX}
            endY={it.endY}
            duration={it.duration}
            rotateSpeed={it.rotateSpeed}
            amplitude={it.amplitude}
            frequency={it.frequency}
            phaseOffset={it.phaseOffset}
            onHit={handleHit}
            onExpire={handleExpire}
          />
        ))}
        {popups.map((p) => (
          <ScorePopup key={p.id} {...p} onDone={handlePopupDone} />
        ))}
      </div>
      <GameHud />
    </>
  )
}

export const GameOverlay = () => {
  const gameMode = useGameMode()
  const settings = useGameSettings()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const onGamePage = pathname.includes('/game')
  const onList = pathname.includes('/list')
  const inScope = settings.scope === 'all' ? !onGamePage : onList && !onGamePage
  const active = gameMode && inScope

  if (!active) {
    return null
  }

  return <GameOverlayInner settings={settings} />
}
