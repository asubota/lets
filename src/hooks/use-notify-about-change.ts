import { useNotifyData } from '../use-data.ts'
import { useCallback, useEffect } from 'react'
import {
  AppMessage,
  AppMessagePush,
  NotificationData,
  Product,
} from '../types.ts'

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

const isMessage = (
  item: Record<string, unknown> | undefined,
): item is AppMessagePush => !!item

const getMessages = (
  products: Product[],
  settings: Record<string, Record<string, string>>,
): AppMessagePush[] => {
  return products
    .filter((p) => p.sku in settings && !!p.stock)
    .map((p) => {
      const stock = parseInt(p.stock || '', 10)
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

        return message
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

        return message
      }

      return undefined
    })
    .filter(isMessage)
}

export const useNotifyAboutChange = () => {
  const data = useNotifyData()

  const settings = JSON.parse(
    localStorage.getItem('lets-bike-sku-settings') || '{"state": {"data": {}}}',
  ).state.data

  const spam = useCallback(() => {
    const items = data?.filter((p) => p.sku in settings && !!p.stock) || []
    const messages = getMessages(items, settings)
    messages.forEach(sendMessageToWorker)
  }, [data, settings])

  useEffect(() => {
    spam()
  }, [spam])

  return async () => {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission()
    }

    if (Notification.permission === 'granted') {
      spam()
    }
  }
}
