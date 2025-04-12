import { useEffect } from 'react'

export const useReloadOnChunkLoadFail = () => {
  useEffect(() => {
    const fn = (event: ErrorEvent) => {
      const msg = event.message || ''
      if (msg.includes('Failed to fetch dynamically imported module')) {
        console.warn('Lazy chunk failed, reloading...')
        window.location.reload()
      }
    }

    window.addEventListener('error', fn)

    return () => {
      window.removeEventListener('error', fn)
    }
  }, [])
}
