import { Box } from '@mui/material'
import { type SxProps, type Theme } from '@mui/material'

// Plain style object only, so it can be spread into the base styles
type LogoSx = Exclude<SxProps<Theme>, readonly unknown[] | ((theme: Theme) => unknown)>

export const Logo = ({ width = '220px', sx }: { width?: string | number; sx?: LogoSx }) => {
  return (
    <Box
      sx={{
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <Box component="img" src="/lets/logo.webp" alt="Logo" sx={{ width: '100%', height: 'auto', display: 'block' }} />
    </Box>
  )
}
