import { Alert } from '@mui/material'
import { gapi } from 'gapi-script'

import { initGoogleAuth } from '../google-auth.ts'
import { getMinutesLeft } from '../tools.tsx'

export const ReAuth = () => {
  const authInstance = gapi.auth2.getAuthInstance()

  if (!authInstance) {
    return <Alert severity="info">Налаштування відсутні</Alert>
  }

  if (getMinutesLeft() <= 1 && !authInstance.isSignedIn.get()) {
    return (
      <Alert
        severity="warning"
        variant="outlined"
        sx={{
          cursor: 'pointer',
          maxWidth: '280px',
          mt: 4,
          ml: 'auto',
          mr: 'auto',
          mb: 1,
        }}
        onClick={initGoogleAuth}
      >
        Треба авторизуватись!
      </Alert>
    )
  }

  return null
}
