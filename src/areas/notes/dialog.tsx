import { FC } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { Link, useNavigate } from '@tanstack/react-router'

export const NotesDialog: FC = () => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate({ to: '/favorites' })
  }

  return (
    <Dialog
      maxWidth="sm"
      open={true}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '100vw',
          maxWidth: '600px',
        },
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          handleClose()
        },
      }}
    >
      <DialogTitle fontSize="medium">Нотатки</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          variant="outlined"
          multiline
          minRows={3}
        />
      </DialogContent>

      <DialogActions>
        <Button sx={{ mr: 'auto' }} size="small">
          Delete
        </Button>
        <Button component={Link} to="/favorites" size="small">
          Cancel
        </Button>
        <Button type="button" size="small">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
