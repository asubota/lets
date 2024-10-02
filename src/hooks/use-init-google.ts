import { useEffect } from 'react'
import { healthCheck } from '../google-api.ts'
import {
  getGoogleAuthToken,
  getGoogleClientId,
  setGoogleAuthToken,
} from '../secrets.ts'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const CLIENT_ID = getGoogleClientId()

const checkAuthState = () => {
  const storedToken = getGoogleAuthToken()

  if (!storedToken) {
    handleAuth()
  } else {
    healthCheck(storedToken)
  }
}

const handleAuth = () => {
  if (!CLIENT_ID) {
    return
  }

  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    callback: (response) => {
      if (response.access_token) {
        setGoogleAuthToken(response.access_token)
      }
    },
  })

  tokenClient.requestAccessToken()
}
export const useInitGoogle = () => {
  useEffect(() => {
    checkAuthState()
  }, [])
}
