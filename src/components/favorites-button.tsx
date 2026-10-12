import { type MouseEventHandler } from 'react'

import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton } from '@mui/material'

import { useToggleFavorite } from '../api.ts'

interface FavoritesButtonProps {
  isFavorite: boolean
  favoriteId: string
}

export const FavoritesButton = ({ isFavorite, favoriteId }: FavoritesButtonProps) => {
  const { mutate } = useToggleFavorite()

  const handleToggle: MouseEventHandler = (event) => {
    event.stopPropagation()
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
        pb: '3px',
        pt: '3px',
        color: isFavorite ? 'warning.light' : 'secondary.light',
      }}
      onClick={handleToggle}
    >
      {isFavorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  )
}
