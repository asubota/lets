import { FC } from 'react'
import { Box, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import StarIcon from '@mui/icons-material/Star'
import { useAppActions, useShowFavs } from '../store'
import { useIsLoading } from '../use-data.ts'

export const AppBar: FC = () => {
  const showFavs = useShowFavs()
  const { toggleFavs } = useAppActions()
  const loading = useIsLoading()

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <IconButton
          disabled={loading}
          onClick={toggleFavs}
          sx={{ color: showFavs ? 'warning.light' : 'secondary.light' }}
        >
          <StarIcon />
        </IconButton>
      </Box>

      <Box sx={{ ml: 'auto' }}>
        <IconButton sx={{ color: 'secondary.light' }}>
          <VisibilityIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
