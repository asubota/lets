import { useCallback, useEffect } from 'react'
import { AppMessage, AppMessagePush } from '../types.ts'
import { useSkuSettings } from '../store/sku-settings.ts'
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from 'notistack'
import { getMessages } from '../tools.tsx'
import { Box, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'
import { useGetChangedProducts } from './use-get-changed-products.hook.ts'

const showNotification = () => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        if (navigator.serviceWorker.controller) {
          const message: AppMessagePush = {
            type: 'push-me' as const,
            payload: {
              title: 'Мущіна, там щось оновилось...',
              options: {
                icon: '/lets/logo.webp',
                data: {
                  to: '/favorites',
                },
              },
            },
          }

          navigator.serviceWorker.controller.postMessage(message)
        }
      })
    }
  })
}

const action = (snackbarId: SnackbarKey) => (
  <IconButton onClick={() => closeSnackbar(snackbarId)}>
    <Close />
  </IconButton>
)

const showAlert = (message: AppMessagePush) => {
  enqueueSnackbar({
    message: (
      <Box
        sx={{
          maxWidth: 'calc(100vw - 112px)',
          color: 'text.primary',
          textDecoration: 'none',
        }}
        component={Link}
        to="/"
        search={{ s: message.payload.options.data.sku }}
      >
        <Box component={Typography} variant="body2">
          {message.payload.title}
        </Box>
        <Box component={Typography} variant="caption">
          {message.payload.options.body}
        </Box>
      </Box>
    ),
    persist: true,
    variant: 'warning',
    hideIconVariant: true,
    preventDuplicate: true,
    action,
  })
}

export const useNotifyAboutChange = () => {
  const settings = useSkuSettings()
  const { items } = useGetChangedProducts()

  const doWork = useCallback(() => {
    const messages = getMessages(items, settings)

    messages.forEach(showAlert)

    if (messages.length > 0) {
      showNotification()
    }
  }, [items, settings])

  useEffect(() => {
    const fn = async (event: MessageEvent<AppMessage>) => {
      if (event.data && event.data.type === 'cache-update') {
        doWork()
      }
    }

    navigator.serviceWorker.addEventListener('message', fn)

    return () => {
      navigator.serviceWorker.removeEventListener('message', fn)
    }
  }, [doWork])
}
