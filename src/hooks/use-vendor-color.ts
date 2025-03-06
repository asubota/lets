import { useGetColors } from '../api-colors.ts'

export const useVendorColor = (vendor: string) => {
  const { colors } = useGetColors()

  return colors[vendor] || {}
}
