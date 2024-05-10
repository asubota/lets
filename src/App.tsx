import { theme } from './theme.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Search } from './search.tsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Search />
    </ThemeProvider>
  )
}

export default App
