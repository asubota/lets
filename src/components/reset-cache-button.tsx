import CachedIcon from '@mui/icons-material/Cached'
import { IconButton } from '@mui/material'
import { useState } from 'react'

export const ResetCacheButton = () => {
  const [rotating, setRotating] = useState(false)

  const handleClick = () => {
    setRotating(true)
    setTimeout(() => setRotating(false), 1200)
  }

  return (
    <IconButton onClick={handleClick}>
      <CachedIcon className={rotating ? 'rotate' : ''} />
    </IconButton>
  )
}
