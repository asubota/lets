import { FC, useState } from 'react'
import { Box } from '@mui/material'
import SafeBike from './bike.svg?react'
import BrokenBike from './broken-bike.svg?react'
import { loadGoogleApi, signIn } from '../google-auth.ts'
import { setGoogleAuthToken } from '../secrets.ts'

export const Bike: FC<{ type: 'safe' | 'broken' }> = ({ type }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)

    loadGoogleApi().then(async () => {
      const authInstance = gapi.auth2.getAuthInstance()

      if (!authInstance.isSignedIn.get()) {
        const accessToken = await signIn()

        setGoogleAuthToken(accessToken)
      }

      setLoading(false)
    })
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: '100%',
        maxWidth: '300px',
        position: 'absolute',
        bottom: '185px',
        left: '50%',
        transform: 'translate(-50%)',
        cursor: loading ? 'none' : 'pointer',
        borderRadius: '50%',
        backgroundColor: loading ? 'secondary.main' : 'transparent',
      }}
    >
      {type === 'safe' && <SafeBike />}
      {type === 'broken' && <BrokenBike />}
    </Box>
  )
}
