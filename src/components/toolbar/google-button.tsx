import { IconButton } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { FC } from 'react'

const handleGoogle = async () => {
  const text = await navigator.clipboard.readText()
  window.open(`https://www.google.com/search?q=${text}`, '_blank')
}

export const GoogleButton: FC = () => {
  return (
    <IconButton
      size="small"
      sx={{ color: 'text.secondary', mr: '14px' }}
      onClick={handleGoogle}
    >
      <GoogleIcon />
    </IconButton>
  )
}
