import EditNoteIcon from '@mui/icons-material/EditNote'
import { IconButton } from '@mui/material'
import { createLink } from '@tanstack/react-router'

import { useGetPropertyFromFavorite } from '../api.ts'

const LinkedIconButton = createLink(IconButton)

export const NotesButton = ({ favoriteId }: { favoriteId: string }) => {
  const hasNote = !!useGetPropertyFromFavorite(favoriteId, 'note')

  return (
    <LinkedIconButton
      size="small"
      sx={{
        color: hasNote ? 'primary.main' : 'text.secondary',
        mr: '2px',
      }}
      to="/favorites/$favoriteId/notes"
      params={{ favoriteId }}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <EditNoteIcon fontSize="small" />
    </LinkedIconButton>
  )
}
