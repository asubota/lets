import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import { IconButton, type IconButtonOwnProps } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'

export const PasteInSearchButton = ({
  size,
}: {
  size: IconButtonOwnProps['size']
}) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    const text = await navigator.clipboard.readText()
    await navigate({ to: '/list', search: { s: text } })
  }

  return (
    <IconButton
      size={size}
      sx={{ color: 'text.secondary', mr: '14px' }}
      onClick={handleClick}
    >
      <ContentPasteSearchIcon />
    </IconButton>
  )
}
