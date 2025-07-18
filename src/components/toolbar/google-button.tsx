import { type FC } from 'react'

import GoogleIcon from '@mui/icons-material/Google'
import { IconButton } from '@mui/material'

const handleGoogle = async () => {
  const text = await navigator.clipboard.readText()
  window.open(`https://www.google.com/search?q=${text}`, '_blank')
}

export const GoogleButton: FC = () => {
  return (
    <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleGoogle}>
      <GoogleIcon />
    </IconButton>
  )
}
