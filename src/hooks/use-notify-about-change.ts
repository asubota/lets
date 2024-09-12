import { useNotifyData } from '../use-data.ts'
import { useEffect } from 'react'
import { useShowNotification } from './use-show-notification.ts'

export const useNotifyAboutChange = () => {
  const data = useNotifyData()

  const settings = JSON.parse(
    localStorage.getItem('lets-bike-sku-settings') || '{"state": {"data": {}}}',
  ).state.data

  const notify = useShowNotification()

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

      if (stock <= min) {
        notify(p.name, `${p.sku}, цього стало менше ніж ${min}`)
      }

      if (stock >= max) {
        notify(p.name, `${p.sku}, цього стало більше ніж ${max}`)
      }
    })
  }, [data, notify, settings])
}
