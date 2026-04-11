import { createContext, type FC, type ReactNode, useEffect, useMemo } from 'react'

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
            default: theme === 'dark' ? '#1e1e1e' : '#f8f9fa',
            paper:
              theme === 'dark'
                ? 'rgba(30,30,30,0.98)'
                : 'rgba(255, 255, 255, 0.98)',
          },
          divider:
            theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.05)',
        },
        shape: {
          borderRadius: 20,
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
          h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
          h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
          h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
          h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
          h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
          subtitle1: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
          button: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700,
            textTransform: 'none',
          },
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow:
                  theme === 'dark'
                    ? '0 12px 48px rgba(0,0,0,0.5)'
                    : '0 8px 32px rgba(0,0,0,0.04)',
                border:
                  theme === 'dark'
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(16px)',
                backgroundImage: 'none',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 14,
                padding: '10px 20px',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                fontWeight: 600,
              },
            },
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
