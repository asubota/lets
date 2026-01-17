import { useEffect } from 'react'

import { showError } from '../alerts'
import { initGoogleAuth } from '../google-auth'
import { loadGoogleApi } from '../google-auth'
import { removeGoogleAuthTokenAndExpiry } from '../secrets'
import { getMinutesLeft } from '../tools'

export const useInitGoogle = () => {
  useEffect(() => {
    loadGoogleApi()
      .then(initGoogleAuth)
      .catch((e) => {
        if (e.message.includes('required parameter')) {
          showError('Налаштування відсутні!')
          removeGoogleAuthTokenAndExpiry()
        }

        if (e.error === 'popup_blocked_by_browser' && getMinutesLeft() <= 1) {
          showError('Треба авторизуватись!')
          removeGoogleAuthTokenAndExpiry()
        }
      })
  }, [])
}
