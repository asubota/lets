import { FC } from 'react'
import { Alert } from '@mui/material'
import { initGoogleAuth } from '../google-auth.ts'
import { gapi } from 'gapi-script'
import { getMinutesLeft } from '../tools.tsx'

export const ReAuth: FC = () => {
  const authInstance = gapi.auth2.getAuthInstance()

  if (getMinutesLeft() <= 1 && !authInstance.isSignedIn.get()) {
    return (
      <Alert
        severity="warning"
        variant="outlined"
        sx={{
          mt: '60px',
          cursor: 'pointer',
          maxWidth: '280px',
          ml: 'auto',
          mr: 'auto',
        }}
        onClick={initGoogleAuth}
      >
        Треба авторизуватись!
      </Alert>
    )
  }

  return null
}
