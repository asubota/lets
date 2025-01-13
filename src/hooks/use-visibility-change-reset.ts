import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  CACHE_CART_KEY,
  CACHE_COLORS_KEY,
  CACHE_FAVORITE_KEY,
} from '../constants.ts'

export const useVisibilityChangeReset = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const fn = async () => {
      if (document.visibilityState === 'visible') {
        await queryClient.invalidateQueries({ queryKey: [CACHE_FAVORITE_KEY] })
        await queryClient.invalidateQueries({ queryKey: [CACHE_COLORS_KEY] })
        await queryClient.invalidateQueries({ queryKey: [CACHE_CART_KEY] })
      }
    }

    document.addEventListener('visibilitychange', fn)

    return () => {
      document.removeEventListener('visibilitychange', fn)
    }
  }, [queryClient])
}
