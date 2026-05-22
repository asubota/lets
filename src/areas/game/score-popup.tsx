import { useEffect, useState } from 'react'

export type ScorePopupData = {
  id: number
  x: number
  y: number
  text: string
  color: string
}

type Props = ScorePopupData & {
  onDone(this: void, id: number): void
}

export const ScorePopup = ({ id, x, y, text, color, onDone }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true))
    const t = setTimeout(() => onDone(id), 700)
    return () => {
      cancelAnimationFrame(r)
      clearTimeout(t)
    }
  }, [id, onDone])

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: mounted ? 'translate(-50%, -110%)' : 'translate(-50%, -50%)',
        opacity: mounted ? 0 : 1,
        transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out',
        color,
        fontWeight: 800,
        fontSize: '20px',
        textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 0 10px rgba(255,255,255,0.4)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {text}
    </div>
  )
}
