import { useNotifyData } from '../use-data.ts'
import { useEffect } from 'react'
import { AppMessage, NotificationData } from '../types.ts'

const sendMessageToWorker = (message: AppMessage) => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(message)
        }
      })
    }
  })
}

export const useNotifyAboutChange = () => {
  const data = useNotifyData()

  const settings = JSON.parse(
    localStorage.getItem('lets-bike-sku-settings') || '{"state": {"data": {}}}',
  ).state.data

  useEffect(() => {
    if (!data) {
      return
    }

    const items = data.filter((p) => p.sku in settings)

    items.forEach((p) => {
      if (!p.stock) {
        return
      }

      const stock = parseInt(p.stock, 10)
      const min = parseInt(settings[p.sku].min, 10)
      const max = parseInt(settings[p.sku].max, 10)

      const data: NotificationData = { sku: p.sku }

      if (stock <= min) {
        const message: AppMessage = {
          type: 'push-me' as const,
          payload: {
            title: p.name,
            options: {
              body: `${p.sku}, цього менше ніж ${min}`,
              icon: '/lets/logo.webp',
              data,
            },
          },
        }

        sendMessageToWorker(message)
      }

      if (stock >= max) {
        const message: AppMessage = {
          type: 'push-me' as const,
          payload: {
            title: p.name,
            options: {
              body: `${p.sku}, цього більше ніж ${max}`,
              icon: '/lets/logo.webp',
              data,
            },
          },
        }

        sendMessageToWorker(message)
      }
    })
  }, [data, settings])
}
