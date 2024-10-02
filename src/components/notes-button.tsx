import { FC } from 'react'
import { IconButton } from '@mui/material'
import { Link } from '@tanstack/react-router'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useGetPropFromFavorite } from '../api.ts'

export const NotesButton: FC<{ favoriteId: string }> = ({ favoriteId }) => {
  const hasNote = !!useGetPropFromFavorite(favoriteId, 'note')

  return (
    <IconButton
      size="small"
      sx={{
        mr: '10px',
        mb: '-6px',
        color: hasNote ? 'primary.main' : 'text.secondary',
      }}
      component={Link}
      to="/favorites/$favoriteId/notes"
      params={{ favoriteId }}
      onClick={(e) => e.stopPropagation()}
    >
      <EditNoteIcon fontSize="small" />
    </IconButton>
  )
}
