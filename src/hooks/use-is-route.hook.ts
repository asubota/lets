import { useMatchRoute } from '@tanstack/react-router'

export const useIsRoute = (to: string) => {
  const matchRoute = useMatchRoute()
  return !!matchRoute({ to })
}
