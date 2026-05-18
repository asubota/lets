import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import { IconButton, type IconButtonOwnProps } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'

export const PasteInSearchButton = ({ size }: { size: IconButtonOwnProps['size'] }) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const text = await navigator.clipboard.readText()
    await navigate({ to: '/list', search: { s: text } })
  }

  return (
    <IconButton title="Вставити з буфера" size={size} sx={{ color: 'text.secondary', borderRadius: '10px' }} onClick={handleClick}>
      <ContentPasteSearchIcon />
    </IconButton>
  )
}
