import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeModeProvider } from '../theme-mode-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CssBaseline } from '@mui/material'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <TanStackRouterDevtools />
        <CssBaseline />

        <Outlet />
      </QueryClientProvider>
    </ThemeModeProvider>
  ),
})
