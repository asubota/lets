import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { useSwipeable } from 'react-swipeable'

interface SwipeableItemProps {
  children: ReactNode
  actions: ReactNode
}

export const SwipeItem: FC<SwipeableItemProps> = ({ children, actions }) => {
  const [swiped, setSwiped] = useState(false)
  const handleSwipeLeft = () => setSwiped(true)
  const handleSwipeRight = () => setSwiped(false)

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventScrollOnSwipe: true,
  })

  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSwiped(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const refPassthrough = (el: HTMLLIElement) => {
    swipeHandlers.ref(el)
    ref.current = el
  }

  return (
    <Box
      {...swipeHandlers}
      ref={refPassthrough}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        mb: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          transition: 'transform 0.3s ease',
          transform: swiped ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {actions}
      </Box>
    </Box>
  )
}
