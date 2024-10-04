import { gapi } from 'gapi-script'
import {
  getGoogleApiKey,
  getGoogleClientId,
  setGoogleAuthToken,
} from './secrets.ts'
import { enqueueSnackbar } from 'notistack'

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  return date.toLocaleString('en-US', options).replace(',', '')
}

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
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
          ],
          scope: SCOPES,
        })
        .then(resolve, reject)
    }

    gapi.load('client:auth2', start)
  })
}

export const signIn = async (): Promise<string> => {
  const auth = gapi.auth2.getAuthInstance()
  await auth.signIn()

  return auth.currentUser.get().getAuthResponse().access_token
}

export const getAccessToken = async (): Promise<string> => {
  const auth = gapi.auth2.getAuthInstance()
  const user = auth.currentUser.get()
  const authResponse = await user.reloadAuthResponse()

  setGoogleAuthToken(authResponse.access_token)

  enqueueSnackbar(`Expires: ${formatDate(new Date(authResponse.expires_at))}`, {
    variant: 'info',
    hideIconVariant: true,
    preventDuplicate: true,
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    autoHideDuration: 3000,
  })

  return authResponse.access_token
}
