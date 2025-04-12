import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router'
import { ThemeModeProvider } from '../theme-mode-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CssBaseline } from '@mui/material'
import { useNotifyAboutChange } from '../hooks/use-notify-about-change.tsx'
import { useListenToCacheUpdate } from '../hooks/use-listen-to-cache-update.ts'
import { useVisibilityChangeReset } from '../hooks/use-visibility-change-reset.ts'
import { useInitGoogle } from '../hooks/use-init-google.ts'
import { ToastContainer } from 'react-toastify'
import { useReloadOnChunkLoadFail } from '../hooks/use-reload-on-chunk-load-fail.ts'

const queryClient = new QueryClient()

const Hooks = () => {
  useNotifyAboutChange()
  useListenToCacheUpdate()
  useVisibilityChangeReset()
  useInitGoogle()
  useReloadOnChunkLoadFail()

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
