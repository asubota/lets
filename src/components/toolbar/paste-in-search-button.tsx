import { FC } from 'react'
import { IconButton } from '@mui/material'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import { useNavigate } from '@tanstack/react-router'
import { useIsRoute } from '../../hooks/use-is-route.hook.ts'

export const PasteInSearchButton: FC = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const text = await navigator.clipboard.readText()
    await navigate({ to: '/', search: { s: text } })
  }

  const isMainRoute = useIsRoute('/')

  if (!isMainRoute) {
    return null
  }

  return (
    <IconButton
      size="small"
      sx={{ color: 'text.secondary', mr: '20px' }}
      onClick={handleClick}
    >
      <ContentPasteSearchIcon />
    </IconButton>
  )
}
