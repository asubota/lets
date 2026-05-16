import { useRouterState } from '@tanstack/react-router'

export const useIsRoute = (to: string) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  return pathname.includes(to)
}
