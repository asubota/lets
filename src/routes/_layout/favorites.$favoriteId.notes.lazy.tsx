import { createLazyFileRoute } from '@tanstack/react-router'
import { NotesDialog } from '../../areas/notes/dialog.tsx'

export const Route = createLazyFileRoute('/_layout/favorites/$favoriteId/notes')({
  component: NotesDialog,
})
