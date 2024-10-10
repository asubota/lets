import { enqueueSnackbar } from 'notistack'

export const showError = (message: string) => {
  enqueueSnackbar(message, {
    variant: 'error',
    autoHideDuration: 8000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  })
}

export const showSuccess = (message: string) => {
  enqueueSnackbar(message, {
    variant: 'info',
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  })
}
