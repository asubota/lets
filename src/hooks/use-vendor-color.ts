import { useGetColors } from '../api-colors.ts'

export const useVendorColor = (vendor: string) => {
  const savedColors = useGetColors()

  return savedColors[vendor] || {}
}
