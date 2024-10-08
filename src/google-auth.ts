import { gapi } from 'gapi-script'
import {
  getGoogleApiKey,
  getGoogleAuthToken,
  getGoogleAuthTokenExpiration,
  getGoogleClientId,
  setGoogleAuthToken,
  setGoogleAuthTokenExpiration,
} from './secrets.ts'
import { enqueueSnackbar } from 'notistack'

const CLIENT_ID = getGoogleClientId()
const API_KEY = getGoogleApiKey()
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'

export const loadGoogleApi = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(resolve, reject)
    }

    gapi.load('client:auth2', start)
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

  await getAccessToken().then(() => {
    enqueueSnackbar('Google In', {
      variant: 'info',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    })
  })
}

export const getAccessToken = async (): Promise<string> => {
  const expiresAt = getGoogleAuthTokenExpiration()
  const minutesLeft = (parseInt(expiresAt, 10) - +new Date()) / 1000 / 60
  const token = getGoogleAuthToken()

  if (minutesLeft < 2 || !token) {
    const auth = gapi.auth2.getAuthInstance()
    const user = auth.currentUser.get()
    const authResponse = await user.reloadAuthResponse()

    setGoogleAuthTokenExpiration(authResponse.expires_at.toString())
    setGoogleAuthToken(authResponse.access_token)

    return authResponse.access_token
  }

  return token
}
