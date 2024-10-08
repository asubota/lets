import { useEffect } from 'react'
import { loadGoogleApi, initGoogleAuth } from '../google-auth.ts'
import { enqueueSnackbar } from 'notistack'

const showAlert = () => {
  enqueueSnackbar(`Google Off`, {
    variant: 'error',
    autoHideDuration: 2000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  })
}

export const useInitGoogle = () => {
  useEffect(() => {
    loadGoogleApi().then(initGoogleAuth).catch(showAlert)
  }, [])
}
