import { CssBaseline } from '@mui/material'
import { Shell } from './shell.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeModeProvider } from './theme-mode-provider.tsx'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition={'bottom-left'}
        />
        <CssBaseline />

        <Shell />
      </QueryClientProvider>
    </ThemeModeProvider>
  )
}

export default App
