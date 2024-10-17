import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CACHE_COLORS_KEY } from './constants.ts'
import { Color, VendorAndColors } from './types.ts'
import { getAllColors, setProp } from './google-api-colors.ts'

const getQueryKey = (): [string] => {
  return [CACHE_COLORS_KEY]
}

function findChanges(
  colors: Record<string, Color>,
  data: Array<VendorAndColors>,
) {
  return Object.entries(colors)
    .filter(([vendor, colorAttributes]) => {
      const dataEntry = data.find((item) => item.vendor === vendor)

      if (!dataEntry) {
        return true
      }

      return (
        colorAttributes.color !== dataEntry.color ||
        colorAttributes.backgroundColor !== dataEntry.backgroundColor ||
        colorAttributes.borderColor !== dataEntry.borderColor
      )
    })
    .map(([vendor, colorAttributes]) => ({ vendor, ...colorAttributes }))
}

export const useSetColors = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, Record<string, Color>>({
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: [CACHE_COLORS_KEY],
      })
    },
    mutationFn: async (colors) => {
      const data =
        queryClient.getQueryData<VendorAndColors[]>(getQueryKey()) || []

      const changes = findChanges(colors, data)
      changes.map(async (change) => await setProp(change))
    },
  })
}

export const useGetColors = () => {
  const { data = {} } = useQuery({
    staleTime: Infinity,
    queryKey: getQueryKey(),
    queryFn: ({ signal }) => getAllColors(signal),
    select(colors) {
      return colors.reduce((acc, { vendor, ...rest }) => {
        return { ...acc, [vendor]: rest }
      }, {})
    },
  })

  return data as Record<string, Color>
}
