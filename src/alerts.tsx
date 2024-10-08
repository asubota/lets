import { enqueueSnackbar } from 'notistack'

export const alertNetworkError = (message: string) => {
  enqueueSnackbar(message, {
    variant: 'error',
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  })
}

export const showSuccess = (message: string) => {
  enqueueSnackbar(message, {
    variant: 'info',
    autoHideDuration: 2000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  })
}
