import { useEffect } from 'react'
import { AppMessage } from '../types.ts'
import { useQueryClient } from '@tanstack/react-query'
import { CACHE_BASE_KEY } from '../constants.ts'

export const useListenToCacheUpdate = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const fn = async (event: MessageEvent<AppMessage>) => {
      if (event.data && event.data.type === 'cache-update') {
        await queryClient.invalidateQueries({ queryKey: [CACHE_BASE_KEY] })
      }
    }

    navigator.serviceWorker.addEventListener('message', fn)

    return () => {
      navigator.serviceWorker.removeEventListener('message', fn)
    }
  }, [queryClient])
}
