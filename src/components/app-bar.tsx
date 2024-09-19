import { FC } from 'react'
import { Box, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import StarIcon from '@mui/icons-material/Star'
import { useIsLoading } from '../use-data.ts'
import { Link } from '@tanstack/react-router'
import { useIsRoute } from '../hooks/use-is-route.hook.ts'

export const AppBar: FC = () => {
  const loading = useIsLoading()
  const isFavouritesRoute = useIsRoute('/favorites')

  return (
    <Box className="app-bar" sx={{ pt: 1 }}>
      <Box className="app-bar-left">
        <IconButton
          component={Link}
          to={isFavouritesRoute ? '/' : '/favorites'}
          disabled={loading}
          sx={{
            color: isFavouritesRoute ? 'warning.light' : 'text.secondary',
          }}
        >
          <StarIcon />
        </IconButton>
      </Box>

      <Box className="app-bar-center" id="app-bar-center" />

      <Box className="app-bar-right">
        <IconButton
          component={Link}
          to="/scanner"
          sx={{ color: 'text.secondary' }}
        >
          <VisibilityIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
