import { useEffect } from 'react'
import { loadGoogleApi, initGoogleAuth } from '../google-auth.ts'

export const useInitGoogle = () => {
  useEffect(() => {
    loadGoogleApi().then(initGoogleAuth)
  }, [])
}
