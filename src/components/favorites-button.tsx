import { FC } from 'react'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton } from '@mui/material'
import { useFavsActions } from '../store/favs.ts'

interface FavoritesButtonProps {
  isFavorite: boolean
  favId: string
}

export const FavoritesButton: FC<FavoritesButtonProps> = ({
  isFavorite,
  favId,
}) => {
  const { toggle } = useFavsActions()

  return (
    <IconButton
      size="small"
      data-no-export
      sx={{
        p: 0,
        mr: 1,
        color: isFavorite ? 'warning.light' : 'secondary.light',
      }}
      onClick={(e) => {
        e.stopPropagation()
        toggle(favId)
      }}
    >
      {isFavorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  )
}
