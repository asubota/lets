import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ToastContainer } from 'react-toastify'

import { useInitGoogle } from '../hooks/use-init-google.ts'
import { useListenToCacheUpdate } from '../hooks/use-listen-to-cache-update.ts'
import { useNotifyAboutChange } from '../hooks/use-notify-about-change.tsx'
import { useVisibilityChangeReset } from '../hooks/use-visibility-change-reset.ts'
import { ThemeModeProvider } from '../theme-mode-provider.tsx'

const queryClient = new QueryClient()

const Hooks = () => {
  useNotifyAboutChange()
  useListenToCacheUpdate()
  useVisibilityChangeReset()
  useInitGoogle()

  return null
}

const Component = () => {
  return (
    <ThemeModeProvider>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <TanStackRouterDevtools />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />

        <CssBaseline />
        <Outlet />
        <Hooks />
      </QueryClientProvider>
    </ThemeModeProvider>
  )
}

export const Route = createRootRoute({
  component: Component,
  notFoundComponent: () => <Navigate to="/list" />,
})
