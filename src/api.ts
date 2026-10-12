import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { CACHE_FAVORITE_KEY } from './constants.ts'
import { addFavorite, getAllFavorites, removeFavorite, updateFavorite } from './supabase-api-favorites.ts'
import { type FavoriteItem } from './types.ts'

const getQueryKey = (): [string] => {
  return [CACHE_FAVORITE_KEY]
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, unknown, { favoriteId: string; isFavorite: boolean }, { list: FavoriteItem[] }>({
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [CACHE_FAVORITE_KEY],
      })
    },
    onMutate: async ({ favoriteId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() })
      const list = queryClient.getQueryData<FavoriteItem[]>(getQueryKey()) ?? []

      if (isFavorite) {
        queryClient.setQueryData<FavoriteItem[]>(getQueryKey(), (old) => [
          ...(old ?? []),
          { favoriteId, time: Date.now(), read: false },
        ])
      } else {
        queryClient.setQueryData<FavoriteItem[]>(getQueryKey(), (old) =>
          old?.filter((item) => item.favoriteId !== favoriteId),
        )
      }

      return { list }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(getQueryKey(), context?.list)
      toast.error('Помилка при зміні обраного. Зміни скасовано.', {
        position: 'bottom-left',
      })
    },
    mutationFn: ({ isFavorite, favoriteId }) => {
      return isFavorite ? addFavorite(favoriteId) : removeFavorite(favoriteId)
    },
  })
}

export const useSetPropertyOnFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation<
    unknown,
    unknown,
    {
      favoriteId: string
      min?: string
      max?: string
      note?: string
      read?: boolean
    },
    { list: FavoriteItem[] }
  >({
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [CACHE_FAVORITE_KEY],
      })
    },
    onMutate: async ({ favoriteId, max, min, note, read }) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() })
      const list = queryClient.getQueryData<FavoriteItem[]>(getQueryKey()) ?? []
      const updatedList = list.map((item) => {
        return item.favoriteId === favoriteId
          ? {
              ...item,
              max: max ?? item.max,
              min: min ?? item.min,
              note: note ?? item.note,
              read: read ?? item.read,
            }
          : item
      })

      queryClient.setQueryData(getQueryKey(), updatedList)

      return { list }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(getQueryKey(), context?.list)
      toast.error('Помилка при оновленні обраного. Зміни скасовано.', {
        position: 'bottom-left',
      })
    },
    mutationFn: async ({ min, max, favoriteId, note, read }) => {
      const updates: Partial<FavoriteItem> = {}

      if (read !== undefined) {
        updates.read = read
      }

      if (min !== undefined) {
        updates.min = Number.parseInt(min, 10)
        updates.read = false
      }

      if (max !== undefined) {
        updates.max = Number.parseInt(max, 10)
        updates.read = false
      }

      if (note !== undefined) {
        updates.note = note
      }

      if (Object.keys(updates).length > 0) {
        await updateFavorite(favoriteId, updates)
      }
    },
  })
}

export const useGetFavorites = () => {
  return useQuery({
    staleTime: 0,
    refetchOnWindowFocus: true,
    queryKey: getQueryKey(),
    queryFn: ({ signal }) =>
      getAllFavorites(signal).then((items) => {
        return items.filter((item) => !!item.favoriteId)
      }),
  })
}

export const useGetPropertyFromFavorite = <T extends keyof FavoriteItem>(
  favoriteId: string,
  property: T,
): FavoriteItem[T] | undefined => {
  const { data = [] } = useGetFavorites()

  return data.find((item) => item.favoriteId === favoriteId)?.[property]
}

export const useFavoriteIds = (): string[] => {
  const { data = [] } = useGetFavorites()

  return data.map((item) => item.favoriteId)
}
