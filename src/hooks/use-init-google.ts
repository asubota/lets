import { useEffect } from 'react'
import { setGoogleAuthToken } from '../secrets.ts'
import { loadGoogleApi, signIn } from '../google-auth.ts'

export const useInitGoogle = () => {
  useEffect(() => {
    loadGoogleApi().then(async () => {
      const authInstance = gapi.auth2.getAuthInstance()

      if (!authInstance.isSignedIn.get()) {
        const accessToken = await signIn()

        setGoogleAuthToken(accessToken)
      }
    })
  }, [])
}
