import { createFileRoute } from '@tanstack/react-router'
import { NotesDialog } from '../../areas/notes/dialog.tsx'

export const Route = createFileRoute('/_layout/favorites/$favoriteId/notes')({
  component: NotesDialog,
})
