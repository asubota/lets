import { getNotifications } from '../tools.tsx'
import { useGetMinMaxBySku } from './use-get-min-max-by-sku.ts'
import { useGetChangedProducts } from './use-get-changed-products.hook.ts'
import { FavNotification } from '../types.ts'

export const useGetNotifications = (
  type: 'all' | 'unread' = 'all',
): FavNotification[] => {
  const minmax = useGetMinMaxBySku()
  const products = useGetChangedProducts()

  const notifications = getNotifications(products, minmax)

  if (type === 'unread') {
    return notifications.filter((n) => !n.read)
  }

  return notifications
}