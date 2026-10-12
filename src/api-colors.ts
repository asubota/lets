import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { CACHE_COLORS_KEY } from './constants'
import { getAllColors, removeColor, setColor } from './supabase-api-colors.ts'
import { type ColorPatch, type VendorAndColors, type VendorColors } from './types'

const getQueryKey = (): [string] => {
  return [CACHE_COLORS_KEY]
}

interface DiffResult {
  added: VendorAndColors[]
  removed: VendorAndColors[]
  changed: VendorAndColors[]
}

function compareVendorData(
  vendor: string,
  newVendorData: ColorPatch,
  oldVendorData: ColorPatch,
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

function findDiff(newData: VendorColors, oldData: VendorColors): DiffResult {
  const result: DiffResult = {
    added: [],
    removed: [],
    changed: [],
  }

  for (const [vendor, newVendorData] of Object.entries(newData)) {
    const oldVendorData = oldData[vendor]

    if (oldVendorData) {
      const diff = compareVendorData(vendor, newVendorData, oldVendorData)
      if (diff) {
        result.changed.push(diff)
      }
    } else {
      result.added.push({ vendor, ...newVendorData })
    }
  }

  for (const [vendor, oldVendorData] of Object.entries(oldData)) {
    if (!newData[vendor]) {
      result.removed.push({ vendor, ...oldVendorData })
    }
  }

  return result
}

export const useSetColors = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, unknown, { currentColors: VendorColors; colors: VendorColors }>({
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: getQueryKey(),
      })
    },
    onError: () => {
      toast.error('Помилка при збереженні кольорів.', {
        position: 'bottom-left',
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
    staleTime: 0,
    refetchOnWindowFocus: true,
    queryKey: getQueryKey(),
    queryFn: ({ signal }) => getAllColors(signal),
    select(colors) {
      const byVendor: VendorColors = {}
      for (const { vendor, ...rest } of colors) {
        byVendor[vendor] = rest
      }
      return byVendor
    },
  })

  return {
    colors: data,
    isLoading,
  }
}
