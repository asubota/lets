import { FC } from 'react'
import { Alert } from '@mui/material'
import { getGoogleAuthToken } from '../secrets.ts'
import { initGoogleAuth } from '../google-auth.ts'

export const ReAuth: FC = () => {
  const token = getGoogleAuthToken()

  if (token && token.length > 0) {
    return null
  }

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
