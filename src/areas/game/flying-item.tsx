import { type PointerEvent as ReactPointerEvent, useEffect, useRef } from 'react'

import { ITEM_KINDS } from './config.ts'
import { ItemSvg } from './item-svg.tsx'
import { type TrajectoryKind, computePosition } from './trajectory.ts'
import { type ItemKind } from '../../store/game.ts'

export type FlyingItemProps = {
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
  onHit(this: void, kind: ItemKind, id: number, x: number, y: number): void
  onExpire(this: void, id: number): void
}

export const FlyingItem = ({
  id,
  kind,
  trajectory,
  startX,
  startY,
  endX,
  endY,
  duration,
  rotateSpeed,
  amplitude,
  frequency,
  phaseOffset,
  onHit,
  onExpire,
}: FlyingItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const aliveRef = useRef(true)

  useEffect(() => {
    aliveRef.current = true
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      if (!aliveRef.current) {
        return
      }
      const elapsed = now - start
      const { x, y } = computePosition(
        {
          kind: trajectory,
          startX,
          startY,
          endX,
          endY,
          duration,
          amplitude,
          frequency,
          phaseOffset,
        },
        elapsed,
      )
      const r = (elapsed / 1000) * rotateSpeed
      const wobble = trajectory === 'pendulum' ? Math.sin(elapsed / 280) * 8 : 0
      const el = ref.current
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r + wobble}deg)`
      }

      if (elapsed >= duration) {
        aliveRef.current = false
        onExpire(id)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      aliveRef.current = false
      cancelAnimationFrame(raf)
    }
  }, [
    id,
    trajectory,
    startX,
    startY,
    endX,
    endY,
    duration,
    rotateSpeed,
    amplitude,
    frequency,
    phaseOffset,
    onExpire,
  ])

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!aliveRef.current) {
      return
    }
    e.stopPropagation()
    aliveRef.current = false
    const rect = ref.current?.getBoundingClientRect()
    const cx = rect ? rect.left + rect.width / 2 : e.clientX
    const cy = rect ? rect.top + rect.height / 2 : e.clientY
    onHit(kind, id, cx, cy)
  }

  const cfg = ITEM_KINDS[kind]
  const visualH = (cfg.size * 140) / 100

  return (
    <div
      ref={ref}
      onPointerDown={handlePointerDown}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: cfg.size,
        height: visualH,
        marginLeft: -cfg.size / 2,
        marginTop: -visualH / 2,
        pointerEvents: 'auto',
        cursor: 'pointer',
        willChange: 'transform',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <ItemSvg kind={kind} />
    </div>
  )
}
