import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CACHE_COLORS_KEY } from './constants.ts'
import { Color, VendorAndColors } from './types.ts'
import { getAllColors, removeColor, setColor } from './google-api-colors.ts'

const getQueryKey = (): [string] => {
  return [CACHE_COLORS_KEY]
}

type VendorData = {
  [vendor: string]: Partial<Color>
}

type DiffResult = {
  added: VendorAndColors[]
  removed: VendorAndColors[]
  changed: VendorAndColors[]
}

function compareVendorData(
  vendor: string,
  newVendorData: Partial<Color>,
  oldVendorData: Partial<Color>,
): VendorAndColors | null {
  const diff: VendorAndColors = { vendor }

  let hasChanges = false

  if (newVendorData.color !== oldVendorData.color) {
    diff.color = newVendorData.color
    hasChanges = true
  }
  if (newVendorData.borderColor !== oldVendorData.borderColor) {
    diff.borderColor = newVendorData.borderColor
    hasChanges = true
  }
  if (newVendorData.backgroundColor !== oldVendorData.backgroundColor) {
    diff.backgroundColor = newVendorData.backgroundColor
    hasChanges = true
  }

  return hasChanges ? diff : null
}

function findDiff(newData: VendorData, oldData: VendorData): DiffResult {
  const result: DiffResult = {
    added: [],
    removed: [],
    changed: [],
  }

  for (const vendor in newData) {
    const newVendorData = newData[vendor]
    const oldVendorData = oldData[vendor]

    if (!oldVendorData) {
      result.added.push({ vendor, ...newVendorData })
    } else {
      const diff = compareVendorData(vendor, newVendorData, oldVendorData)
      if (diff) {
        result.changed.push(diff)
      }
    }
  }

  for (const vendor in oldData) {
    if (!newData[vendor]) {
      result.removed.push({ vendor, ...oldData[vendor] })
    }
  }

  return result
}

export const useSetColors = () => {
  const queryClient = useQueryClient()

  return useMutation<
    void,
    unknown,
    { currentColors: VendorData; colors: VendorData }
  >({
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: getQueryKey(),
      })
    },
    mutationFn: async ({ currentColors, colors }) => {
      const diff = findDiff(colors, currentColors)

      for (const change of diff.added) {
        await setColor(change)
      }

      for (const change of diff.changed) {
        await setColor(change)
      }

      for (const change of diff.removed) {
        await removeColor(change)
      }
    },
  })
}

export const useGetColors = () => {
  const { data = {}, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: getQueryKey(),
    queryFn: ({ signal }) => getAllColors(signal),
    select(colors) {
      return colors.reduce((acc, { vendor, ...rest }) => {
        return { ...acc, [vendor]: rest }
      }, {})
    },
  })

  return {
    colors: data as Record<string, Color>,
    isLoading,
  }
}
