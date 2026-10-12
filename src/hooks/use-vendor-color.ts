import { useGetColors } from '../api-colors.ts'
import { type ColorPatch } from '../types.ts'

export const useVendorColor = (vendor: string): ColorPatch => {
  const { colors } = useGetColors()

  return colors[vendor] ?? {}
}
