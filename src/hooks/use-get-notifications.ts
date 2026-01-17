import { getNotifications } from '../tools'
import { useGetChangedProducts } from './use-get-changed-products.hook'
import { useGetMinMaxBySku } from './use-get-min-max-by-sku'
import { type FavNotification } from '../types'

export const useGetNotifications = (type: 'all' | 'unread' = 'all'): FavNotification[] => {
  const minmax = useGetMinMaxBySku()
  const products = useGetChangedProducts()
  const notifications = getNotifications(products, minmax)

  if (type === 'unread') {
    return notifications.filter((n) => !n.read)
  }

  return notifications
}
