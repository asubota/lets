import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { CACHE_BASE_KEY } from '../constants'
import { useAppActions } from '../store'
import { type AppMessage } from '../types'

export const useListenToCacheUpdate = () => {
  const queryClient = useQueryClient()
  const { setLoadingProgress } = useAppActions()

  useEffect(() => {
    const fn = async (event: MessageEvent<AppMessage>) => {
      console.log('[UI] Received SW message:', event.data?.type)
      if (!event.data) {
        return
      }

      switch (event.data.type) {
        case 'SYNC_START':
          console.log('[UI] Sync start detected')
          setLoadingProgress({ loaded: 0, total: 0, percent: 0 })
          break

        case 'SYNC_PROGRESS':
          setLoadingProgress(event.data.payload)
          break

        case 'SYNC_END':
          setLoadingProgress(null)
          await queryClient.invalidateQueries({ queryKey: [CACHE_BASE_KEY] })
          toast.info(`Мущіна, дані оновленно! [${event.data.payload.count}]`, {
            icon: false,
            autoClose: 2500,
            theme: 'colored',
            closeButton: false,
            hideProgressBar: true,
            position: 'bottom-left',
          })
          break

        case 'SYNC_ERROR':
          setLoadingProgress(null)
          toast.error(`Збій завантаження: ${event.data.payload.message}`, {
            position: 'bottom-left',
          })
          break

        case 'cache-reset-done':
          queryClient.clear()
          toast.success('Кеш та базу даних очищено. Починаємо нову синхронізацію...', {
            position: 'bottom-left',
          })
          break
      }
    }

    navigator.serviceWorker.addEventListener('message', fn)

    return () => {
      navigator.serviceWorker.removeEventListener('message', fn)
    }
  }, [queryClient, setLoadingProgress])
}
