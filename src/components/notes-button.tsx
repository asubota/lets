import { type FC } from 'react'

import EditNoteIcon from '@mui/icons-material/EditNote'
import { IconButton } from '@mui/material'
import { createLink } from '@tanstack/react-router'

import { useGetPropFromFavorite } from '../api.ts'

const LinkedIconButton = createLink(IconButton)

export const NotesButton: FC<{ favoriteId: string }> = ({ favoriteId }) => {
  const hasNote = !!useGetPropFromFavorite(favoriteId, 'note')

  return (
    <LinkedIconButton
      size="small"
      sx={{
        color: hasNote ? 'primary.main' : 'text.secondary',
        mr: '2px',
      }}
      to="/favorites/$favoriteId/notes"
      params={{ favoriteId }}
      onClick={(e) => e.stopPropagation()}
    >
      <EditNoteIcon fontSize="small" />
    </LinkedIconButton>
  )
}
