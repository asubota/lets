import { createContext, FC, ReactNode, useEffect, useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { useAppActions, useAppTheme } from './store'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export const ThemeModeProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const theme = useAppTheme()
  const { setTheme } = useAppActions()

  useEffect(() => {
    const el = document.getElementById('root')
    if (el) {
      el.classList.add(theme)
    }
  }, [theme])

  const colorMode = {
    toggleColorMode: () => {
      const el = document.getElementById('root')

      if (el) {
        if (theme === 'dark') {
          el.classList.remove('dark')
          el.classList.add('light')
          setTheme('light')
        } else {
          el.classList.remove('light')
          el.classList.add('dark')
          setTheme('dark')
        }
      }
    },
  }

  const value = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: '#ea2b06',
          },
          secondary: {
            main: '#434343',
          },
          background: {
            default: '#f8f8f8',
          },
        },
      }),
    [theme],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={value}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
