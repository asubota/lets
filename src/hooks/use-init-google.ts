import { useEffect } from 'react'
import { loadGoogleApi, initGoogleAuth } from '../google-auth.ts'
import { showError } from '../alerts.tsx'
import { removeGoogleAuthTokenAndExpiry } from '../secrets.ts'
import { getMinutesLeft } from '../tools.tsx'

export const useInitGoogle = () => {
  useEffect(() => {
    loadGoogleApi()
      .then(initGoogleAuth)
      .catch((e) => {
        if (e.error === 'popup_blocked_by_browser' && getMinutesLeft() <= 1) {
          showError('Треба авторизуватись!')
          removeGoogleAuthTokenAndExpiry()
        }
      })
  }, [])
}
