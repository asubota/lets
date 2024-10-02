import { FC, MouseEventHandler } from 'react'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton } from '@mui/material'
import { useToggleFavorite } from '../api.ts'

interface FavoritesButtonProps {
  isFavorite: boolean
  favoriteId: string
}

export const FavoritesButton: FC<FavoritesButtonProps> = ({
  isFavorite,
  favoriteId,
}) => {
  const { mutate } = useToggleFavorite()

  const handleToggle: MouseEventHandler = (e) => {
    e.stopPropagation()
    mutate({
      favoriteId,
      isFavorite: !isFavorite,
    })
  }

  return (
    <IconButton
      size="small"
      data-no-export
      sx={{
        mr: 1,
        mb: '-6px',
        color: isFavorite ? 'warning.light' : 'secondary.light',
      }}
      onClick={handleToggle}
    >
      {isFavorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  )
}
