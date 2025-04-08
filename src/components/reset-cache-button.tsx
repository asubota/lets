import CachedIcon from '@mui/icons-material/Cached'
import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { CACHE_BASE_KEY } from '../constants.ts'
import { AppMessage } from '../types.ts'

export const ResetCacheButton = () => {
  const [rotating, setRotating] = useState(false)
  const queryClient = useQueryClient()

  const handleClick = () => {
    navigator.serviceWorker.ready.then(() => {
      if (navigator.serviceWorker.controller) {
        setRotating(true)
        const message: AppMessage = { type: 'cache-reset-request' }
        navigator.serviceWorker.controller.postMessage(message)
      }
    })
  }

  useEffect(() => {
    const fn = async (event: MessageEvent<AppMessage>) => {
      if (event.data && event.data.type === 'cache-reset-done') {
        queryClient
          .invalidateQueries({ queryKey: [CACHE_BASE_KEY] })
          .then(() => {
            setRotating(false)
          })
      }
    }

    navigator.serviceWorker.addEventListener('message', fn)

    return () => {
      navigator.serviceWorker.removeEventListener('message', fn)
    }
  }, [queryClient])

  return (
    <IconButton onClick={handleClick}>
      <CachedIcon className={rotating ? 'rotate' : ''} />
    </IconButton>
  )
}
