import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { CACHE_CART_KEY, POPULAR_SERViCE_PREFIX } from './constants'
import {
  addToCart,
  getCart,
  removeFromCart,
  setCartPopularServices,
  updateCartItem,
} from './supabase-api-cart.ts'
import { type CartItem } from './types'

const getQueryKey = (): [string] => {
  return [CACHE_CART_KEY]
}

export const useGetCart = () => {
  return useQuery({
    staleTime: 1000 * 60 * 35, // 35 minutes
    queryKey: getQueryKey(),
    queryFn: ({ signal }) =>
      getCart(signal).then((items) => {
        return items.filter((item) => !!item.itemId)
      }),
  })
}

export const useSetPropOnCart = () => {
  const queryClient = useQueryClient()

  return useMutation<
    void,
    unknown,
    { itemId: string } & Partial<CartItem>,
    { list: CartItem[] }
  >({
    async onSettled() {
      return await queryClient.invalidateQueries({ queryKey: getQueryKey() })
    },
    onMutate: async ({ itemId, quantity, discount }) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() })
      const list = queryClient.getQueryData<CartItem[]>(getQueryKey()) || []

      const updatedList = list.map((item) => {
        return item.itemId !== itemId
          ? item
          : {
              ...item,
              quantity: quantity !== undefined ? quantity : item.quantity,
              discount: discount !== undefined ? discount : item.discount,
            }
      })

      queryClient.setQueryData(getQueryKey(), updatedList)

      return { list }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(getQueryKey(), context?.list)
      toast.error('Помилка при оновленні кошика. Зміни скасовано.', {
        position: 'bottom-left',
      })
    },
    mutationFn: async ({ discount, quantity, itemId }) => {
      const updates: Partial<Omit<CartItem, 'itemId'>> = {}
      if (discount !== undefined) {
        updates.discount = discount
      }

      if (quantity !== undefined) {
        updates.quantity = quantity
      }

      if (Object.keys(updates).length > 0) {
        await updateCartItem(itemId, updates)
      }
    },
  })
}

export const useSetPopularServicesForCart = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, { itemIds: string[] }, { list: CartItem[] }>({
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: [CACHE_CART_KEY],
      })
    },
    onMutate: async ({ itemIds }) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() })
      const list = queryClient.getQueryData<CartItem[]>(getQueryKey()) || []

      queryClient.setQueryData<CartItem[]>(getQueryKey(), (old = []) => {
        const noPopularServiceItems = old.filter(
          (item) => !item.itemId.startsWith(POPULAR_SERViCE_PREFIX),
        )
        const popularServiceItems = itemIds.map((id) => ({
          itemId: id,
          quantity: '1',
          discount: '0',
          cartId: '1',
        }))

        return [...noPopularServiceItems, ...popularServiceItems]
      })

      return { list }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(getQueryKey(), context?.list)
      toast.error('Помилка при оновленні популярних послуг. Зміни скасовано.', {
        position: 'bottom-left',
      })
    },
    mutationFn: ({ itemIds }) => {
      return setCartPopularServices(itemIds)
    },
  })
}

export const useToggleInCart = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, { itemId: string; action: 'add' | 'remove' }, { list: CartItem[] }>({
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: [CACHE_CART_KEY],
      })
    },
    onMutate: async ({ itemId, action }) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() })
      const list = queryClient.getQueryData<CartItem[]>(getQueryKey()) || []

      if (action === 'remove') {
        queryClient.setQueryData<CartItem[]>(getQueryKey(), (old) => {
          return old?.filter((item) => item.itemId !== itemId)
        })
      }

      if (action === 'add') {
        queryClient.setQueryData<CartItem[]>(getQueryKey(), (old) => {
          const exisingItem = old?.find((item) => item.itemId === itemId)
          if (!exisingItem) {
            return [...(old || []), { itemId, quantity: '1', discount: '0', cartId: '1' }]
          }

          return old
        })
      }

      return { list }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(getQueryKey(), context?.list)
      toast.error('Помилка при зміні кошика. Зміни скасовано.', {
        position: 'bottom-left',
      })
    },
    mutationFn: ({ itemId, action }) => {
      if (action === 'add') {
        return addToCart(itemId)
      }

      if (action === 'remove') {
        return removeFromCart(itemId)
      }

      return Promise.resolve()
    },
  })
}
