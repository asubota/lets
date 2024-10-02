import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CACHE_FAVORITE_KEY } from './constants.ts'
import {
  addFavorite,
  getAllFavorites,
  removeFavorite,
  setProp,
} from './google-api.ts'
import { FavoriteItem } from './types.ts'
import { getGoogleAuthToken } from './secrets.ts'

const getQueryKey = (): [string, string] => {
  return [CACHE_FAVORITE_KEY, getGoogleAuthToken()]
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation<
    void,
    unknown,
    { favoriteId: string; isFavorite: boolean },
    { list: FavoriteItem[] }
  >({
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: [CACHE_FAVORITE_KEY],
      })
    },
    onMutate: async ({ favoriteId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() })
      const list = queryClient.getQueryData<FavoriteItem[]>(getQueryKey()) || []

      if (isFavorite) {
        queryClient.setQueryData<FavoriteItem[]>(getQueryKey(), (old) => [
          ...(old || []),
          { favoriteId },
        ])
      } else {
        queryClient.setQueryData<FavoriteItem[]>(getQueryKey(), (old) =>
          old?.filter((item) => item.favoriteId !== favoriteId),
        )
      }

      return { list }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([getQueryKey()[1]], context?.list)
    },
    mutationFn: ({ isFavorite, favoriteId }) => {
      const token = getGoogleAuthToken()
      const list = queryClient.getQueryData<FavoriteItem[]>(getQueryKey()) || []
      return isFavorite
        ? addFavorite(favoriteId, token)
        : removeFavorite(favoriteId, token, list)
    },
  })
}

export const useSetPropOnFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation<
    void,
    unknown,
    { favoriteId: string; min?: string; max?: string; note?: string },
    { list: FavoriteItem[] }
  >({
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: [CACHE_FAVORITE_KEY],
      })
    },
    onMutate: async ({ favoriteId, max, min, note }) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() })
      const list = queryClient.getQueryData<FavoriteItem[]>(getQueryKey()) || []
      const updatedList = list.map((item) => {
        return item.favoriteId !== favoriteId
          ? item
          : {
              ...item,
              max: max !== undefined ? max : item.max,
              min: min !== undefined ? min : item.min,
              note: note !== undefined ? note : item.note,
            }
      })

      queryClient.setQueryData(getQueryKey(), updatedList)

      return { list }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([getQueryKey()[1]], context?.list)
    },
    mutationFn: async ({ min, max, favoriteId, note }) => {
      const list = queryClient.getQueryData<FavoriteItem[]>(getQueryKey()) || []
      const token = getGoogleAuthToken()

      if (min !== undefined) {
        await setProp(favoriteId, 'min', min, token, list)
      }

      if (max !== undefined) {
        await setProp(favoriteId, 'max', max, token, list)
      }

      if (note !== undefined) {
        await setProp(favoriteId, 'note', note, token, list)
      }
    },
  })
}

export const useGetFavorites = () => {
  return useQuery({
    staleTime: 1000 * 60 * 55, // 55 minutes
    queryKey: getQueryKey(),
    queryFn: ({ queryKey }) => getAllFavorites(queryKey[1]),
  })
}

export const useGetPropFromFavorite = <T extends keyof FavoriteItem>(
  favoriteId: string,
  prop: T,
): FavoriteItem[T] | undefined => {
  const { data = [] } = useGetFavorites()

  const favoriteItem = data.find((item) => item.favoriteId === favoriteId)

  if (favoriteItem) {
    return favoriteItem[prop]
  }
}

export const useFavoriteIds = (): string[] => {
  const { data = [] } = useGetFavorites()

  return data.map((item) => item.favoriteId).filter(Boolean)
}
