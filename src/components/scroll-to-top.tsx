import { useEffect, useState } from 'react'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Fab, Zoom } from '@mui/material'

const handleClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const ScrollToTop = () => {
  const [showFab, setShowFab] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFab(true)
      } else {
        setShowFab(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Zoom in={showFab}>
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: '75px',
          right: '75px',
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}
