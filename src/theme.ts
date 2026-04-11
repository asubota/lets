import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ea2b06',
    },
    secondary: {
      main: '#434343',
    },
    background: {
      default: '#f8f9fa',
      paper: 'rgba(255, 255, 255, 0.98)',
    },
    divider: 'rgba(0, 0, 0, 0.05)',
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
          boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(16px)',
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
})
