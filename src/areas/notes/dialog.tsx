import { type SyntheticEvent } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { createLink, useNavigate, useParams } from '@tanstack/react-router'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useGetPropertyFromFavorite, useSetPropertyOnFavorite } from '../../api.ts'

interface NoteForm {
  note: string
}

const LinkedButton = createLink(Button)

export const NotesDialog = () => {
  const { favoriteId } = useParams({
    from: '/_layout/favorites/$favoriteId/notes',
  })
  const navigate = useNavigate()
  const note = useGetPropertyFromFavorite(favoriteId, 'note')
  const { register, handleSubmit } = useForm<NoteForm>({
    defaultValues: { note: note ?? '' },
  })

  const { mutate } = useSetPropertyOnFavorite()

  const handleClose = () => {
    void navigate({ to: '/favorites' })
  }

  const onSubmit: SubmitHandler<NoteForm> = ({ note }) => {
    if (favoriteId) {
      mutate({ favoriteId, note })
      handleClose()
    }
  }

  const handleDelete = () => {
    if (favoriteId) {
      mutate({ favoriteId, note: '' })
      handleClose()
    }
  }

  return (
    <Dialog
      maxWidth="sm"
      open={true}
      onClose={handleClose}
      sx={{
        '.MuiDialog-scrollPaper': {
          alignItems: 'flex-start',
        },
      }}
      slotProps={{
        paper: {
          sx: {
            width: '100vw',
            maxWidth: '600px',
          },
          component: 'form',
          onSubmit: (event: SyntheticEvent) => void handleSubmit(onSubmit)(event),
        },
      }}
    >
      <DialogTitle fontSize="medium">Нотатки</DialogTitle>
      <DialogContent>
        <TextField {...register('note')} autoFocus fullWidth variant="outlined" multiline minRows={3} />
      </DialogContent>

      <DialogActions>
        <Button sx={{ mr: 'auto' }} size="small" onClick={handleDelete}>
          Delete
        </Button>
        <LinkedButton to="/favorites" size="small">
          Cancel
        </LinkedButton>
        <Button type="submit" size="small">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
