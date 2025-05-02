import { gapi } from 'gapi-script'

import { showError } from './alerts.tsx'
import {
  getGoogleAuthToken,
  getGoogleClientId,
  removeGoogleAuthTokenAndExpiry,
  setGoogleAuthToken,
  setGoogleAuthTokenExpiration,
} from './secrets.ts'
import { getMinutesLeft } from './tools.tsx'

const CLIENT_ID = getGoogleClientId()
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets'

export const loadGoogleApi = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    function start() {
      try {
        gapi.auth2
          .init({ client_id: CLIENT_ID, scope: SCOPES })
          .then(() => resolve(), reject)
      } catch (e) {
        reject(e)
      }
    }

    gapi.load('auth2', start)
  })
}

const signIn = async (): Promise<string> => {
  const authInstance = gapi.auth2.getAuthInstance()
  await authInstance.signIn()

  return authInstance.currentUser.get().getAuthResponse().access_token
}

export const initGoogleAuth = async () => {
  const authInstance = gapi.auth2.getAuthInstance()

  if (!authInstance.isSignedIn.get()) {
    await signIn()
  }

  return await getAccessToken()
}

export const getAccessToken = async (): Promise<string> => {
  const minutesLeft = getMinutesLeft()
  const token = getGoogleAuthToken()

  if (minutesLeft < 30 || !token || token.length === 0) {
    try {
      const authInstance = gapi.auth2.getAuthInstance()
      const user = authInstance.currentUser.get()
      const authResponse = await user.reloadAuthResponse()

      setGoogleAuthTokenExpiration(authResponse.expires_at.toString())
      setGoogleAuthToken(authResponse.access_token)

      return authResponse.access_token
    } catch {
      showError('Треба авторизуватись!')
      removeGoogleAuthTokenAndExpiry()
    }
  }

  return token
}
