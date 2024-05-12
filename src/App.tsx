import { theme } from './theme.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SearchSection } from './search.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CssBaseline />
        <SearchSection />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
