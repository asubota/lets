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
            main: '#64748b', // Slate 500
          },
          background: {
            default: theme === 'dark' ? '#080d18' : '#f1f5f9',
            paper:
              theme === 'dark'
                ? '#1e293b'
                : '#ffffff',
          },
          divider:
            theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0, 0, 0, 0.04)',
        },
        shape: {
          borderRadius: 20,
        },
        typography: {
          fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
          subtitle1: { fontWeight: 600 },
          button: {
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
                    ? '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
                    : '0 2px 16px rgba(15, 23, 42, 0.06), 0 1px 4px rgba(15, 23, 42, 0.04)',
                border:
                  theme === 'dark'
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid rgba(0,0,0,0.06)',
                backdropFilter: 'blur(24px) saturate(180%)',
                backgroundImage:
                  theme === 'dark'
                    ? 'linear-gradient(145deg, rgba(30, 41, 60, 0.9) 0%, rgba(22, 30, 46, 0.95) 100%)'
                    : 'none',
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 700,
                boxShadow: 'none',
                textTransform: 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(15, 23, 42, 0.1)',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              },
              sizeSmall: {
                padding: '6px 16px',
                fontSize: '13px',
              },
              sizeMedium: {
                padding: '10px 24px',
                fontSize: '14px',
              },
              sizeLarge: {
                padding: '12px 32px',
                fontSize: '16px',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                fontWeight: 700,
                fontFamily: '"Outfit", sans-serif',
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
