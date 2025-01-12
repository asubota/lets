import { FC } from 'react'
import { IconButton } from '@mui/material'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import { useNavigate } from '@tanstack/react-router'

export const PasteInSearchButton: FC = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const text = await navigator.clipboard.readText()
    await navigate({ to: '/list', search: { s: text } })
  }

  return (
    <IconButton
      size="small"
      sx={{ color: 'text.secondary', mr: '14px' }}
      onClick={handleClick}
    >
      <ContentPasteSearchIcon />
    </IconButton>
  )
}
