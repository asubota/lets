import { theme } from './theme.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Shell } from './shell.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        <CssBaseline />

        <Shell />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
