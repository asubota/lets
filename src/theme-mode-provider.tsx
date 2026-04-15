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
            default: theme === 'dark' ? '#0f172a' : '#f8fafc', // Slate 900 vs Slate 50
            paper:
              theme === 'dark'
                ? '#1e293b' // Slate 800
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
                    ? '0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
                    : '0 8px 32px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.3)',
                border: 'none',
                backdropFilter: 'blur(24px) saturate(180%)',
                backgroundImage: 'none',
                borderRadius: '24px',
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
