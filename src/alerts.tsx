import { toast } from 'react-toastify'

export const showError = (message: string) => {
  toast.error(message, {
    autoClose: 6000,
    position: 'top-center',
    theme: 'colored',
    hideProgressBar: true,
    closeButton: false,
  })
}
