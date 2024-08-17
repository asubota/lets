import { FC, ReactNode } from 'react'
import { Box, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import StarIcon from '@mui/icons-material/Star'
import { useAppActions, useAppMode } from '../store'
import { useIsLoading } from '../use-data.ts'
import { Link } from '@tanstack/react-router'

export const AppBar: FC<{ children: ReactNode }> = ({ children }) => {
  const mode = useAppMode()
  const { toggleFavs } = useAppActions()
  const loading = useIsLoading()

  return (
    <Box className="app-bar" sx={{ pt: 1 }}>
      <Box className="app-bar-left">
        <IconButton
          disabled={loading}
          onClick={toggleFavs}
          sx={{ color: mode === 'favs' ? 'warning.light' : 'text.secondary' }}
        >
          <StarIcon />
        </IconButton>
      </Box>

      <Box className="app-bar-center">{children}</Box>

      <Box className="app-bar-right">
        <IconButton
          component={Link}
          to="/scanner"
          sx={{ color: 'text.secondary' }}
          disabled={loading || mode === 'favs'}
        >
          <VisibilityIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
