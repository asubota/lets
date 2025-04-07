import CachedIcon from '@mui/icons-material/Cached'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { CACHE_BASE_KEY } from '../constants.ts'

export const ResetCacheButton = () => {
  const [rotating, setRotating] = useState(false)
  const queryClient = useQueryClient()

  const handleClick = () => {
    setRotating(true)
    setTimeout(() => setRotating(false), 1200)

    queryClient.invalidateQueries({ queryKey: [CACHE_BASE_KEY] }).then(() => {
      navigator.serviceWorker.ready.then(() => {
        const message = { type: 'reset-cache' }
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(message)
        }
      })
    })
  }

  return (
    <IconButton onClick={handleClick}>
      <CachedIcon className={rotating ? 'rotate' : ''} />
    </IconButton>
  )
}
