import { useEffect, useState } from 'react'

import CachedIcon from '@mui/icons-material/Cached'
import { IconButton } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'

import { CACHE_BASE_KEY } from '../constants.ts'
import { type AppMessage } from '../types.ts'

export const ResetCacheButton = () => {
  const [rotating, setRotating] = useState(false)
  const queryClient = useQueryClient()

  const handleClick = async () => {
    await navigator.serviceWorker.ready
    if (navigator.serviceWorker.controller) {
      setRotating(true)
      const message: AppMessage = { type: 'cache-reset-request' }
      navigator.serviceWorker.controller.postMessage(message)
    }
  }

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<AppMessage>) => {
      if (event.data.type === 'cache-reset-done') {
        await queryClient.invalidateQueries({ queryKey: [CACHE_BASE_KEY] })
        setRotating(false)
      }
    }
    const listener = (event: MessageEvent<AppMessage>) => void handleMessage(event)

    navigator.serviceWorker.addEventListener('message', listener)

    return () => {
      navigator.serviceWorker.removeEventListener('message', listener)
    }
  }, [queryClient])

  return (
    <IconButton onClick={handleClick} sx={{ color: 'text.secondary' }} disabled={rotating}>
      <CachedIcon className={rotating ? 'rotate' : ''} />
    </IconButton>
  )
}
