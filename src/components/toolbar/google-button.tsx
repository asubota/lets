import { IconButton } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { FC } from 'react'
import { useIsRoute } from '../../hooks/use-is-route.hook.ts'

const handleGoogle = async () => {
  const text = await navigator.clipboard.readText()
  window.open(`https://www.google.com/search?q=${text}`, '_blank')
}

export const GoogleButton: FC = () => {
  const isMainRoute = useIsRoute('/')

  if (!isMainRoute) {
    return null
  }

  return (
    <IconButton
      size="small"
      sx={{ color: 'text.secondary', mr: '20px' }}
      onClick={handleGoogle}
    >
      <GoogleIcon />
    </IconButton>
  )
}
