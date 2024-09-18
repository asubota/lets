import { useEffect } from 'react'
import { AppMessage } from '../types.ts'
import { useQueryClient } from '@tanstack/react-query'
import { CACHE_BASE_KEY } from '../constants.ts'
import { enqueueSnackbar } from 'notistack'
import Grow from '@mui/material/Grow'

export const useListenToCacheUpdate = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const fn = async (event: MessageEvent<AppMessage>) => {
      if (event.data && event.data.type === 'cache-update') {
        await queryClient
          .invalidateQueries({ queryKey: [CACHE_BASE_KEY] })
          .then(() => {
            enqueueSnackbar('Мущіна, дані оновленно!', {
              TransitionComponent: Grow,
              variant: 'info',
              hideIconVariant: true,
              preventDuplicate: true,
              autoHideDuration: 2500,
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
