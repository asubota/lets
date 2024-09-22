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
import {
  useGetNoteBySku,
  useSkuSettingsActions,
} from '../../store/sku-settings.ts'
import { SubmitHandler, useForm } from 'react-hook-form'

type NoteForm = {
  note: string
}

export const NotesDialog: FC = () => {
  const { sku } = useParams({ strict: false })
  const { setSetting } = useSkuSettingsActions()
  const navigate = useNavigate()
  const note = useGetNoteBySku(sku || '')
  const { register, handleSubmit } = useForm<NoteForm>({
    defaultValues: { note },
  })

  const handleClose = () => {
    navigate({ to: '/favorites' })
  }

  const onSubmit: SubmitHandler<NoteForm> = ({ note }) => {
    if (sku) {
      setSetting(sku, { note })
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
        <Button sx={{ mr: 'auto' }} size="small">
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
