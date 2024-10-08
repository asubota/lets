import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeModeProvider } from '../theme-mode-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { useNotifyAboutChange } from '../hooks/use-notify-about-change.tsx'
import { useListenToCacheUpdate } from '../hooks/use-listen-to-cache-update.ts'
import { useVisibilityChangeReset } from '../hooks/use-visibility-change-reset.ts'
import { useInitGoogle } from '../hooks/use-init-google.ts'
import { Version } from '../components/version.tsx'

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
      <SnackbarProvider maxSnack={10} />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />

        <CssBaseline />
        <Outlet />
        <Hooks />
      </QueryClientProvider>
      <Version />
    </ThemeModeProvider>
  )
}

export const Route = createRootRoute({
  component: Component,
})
