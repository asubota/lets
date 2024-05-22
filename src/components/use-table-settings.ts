import { useState } from 'react'

export const useTableSettings = () => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((v) => !v)

  return {
    open,
    toggle,
  }
}
