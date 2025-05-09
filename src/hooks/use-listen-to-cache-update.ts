import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { CACHE_BASE_KEY } from '../constants.ts'
import { type AppMessage } from '../types.ts'

export const useListenToCacheUpdate = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const fn = async (event: MessageEvent<AppMessage>) => {
      if (event.data && event.data.type === 'cache-updated') {
        const { count } = event.data.payload
        await queryClient
          .invalidateQueries({ queryKey: [CACHE_BASE_KEY] })
          .then(() => {
            toast.info(`Мущіна, дані оновленно! [${count}]`, {
              icon: false,
              autoClose: 2500,
              theme: 'colored',
              closeButton: false,
              hideProgressBar: true,
              position: 'bottom-left',
            })
          })
      }
    }

    navigator.serviceWorker.addEventListener('message', fn)

    return () => {
      navigator.serviceWorker.removeEventListener('message', fn)
    }
  }, [queryClient])
}
