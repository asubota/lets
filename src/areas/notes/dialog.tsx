import { FC } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useGetPropFromFavorite, useSetPropOnFavorite } from '../../api.ts'

type NoteForm = {
  note: string
}

export const NotesDialog: FC = () => {
  const { favoriteId = '' } = useParams({ strict: false })
  const navigate = useNavigate()
  const note = useGetPropFromFavorite(favoriteId, 'note')
  const { register, handleSubmit } = useForm<NoteForm>({
    defaultValues: { note },
  })

  const { mutate } = useSetPropOnFavorite()

  const handleClose = () => navigate({ to: '/favorites' })

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
      PaperProps={{
        sx: {
          width: '100vw',
          maxWidth: '600px',
        },
        component: 'form',
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle fontSize="medium">Нотатки</DialogTitle>
      <DialogContent>
        <TextField
          {...register('note')}
          autoFocus
          fullWidth
          variant="outlined"
          multiline
          minRows={3}
        />
      </DialogContent>

      <DialogActions>
        <Button sx={{ mr: 'auto' }} size="small" onClick={handleDelete}>
          Delete
        </Button>
        <Button component={Link} to="/favorites" size="small">
          Cancel
        </Button>
        <Button type="submit" size="small">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
