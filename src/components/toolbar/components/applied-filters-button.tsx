import FilterListIcon from '@mui/icons-material/FilterList'
import { Box, IconButton } from '@mui/material'
import { type Theme } from '@mui/material/styles'

import { useAppliedFilters } from '../../../store/appliedFilters.ts'
import { useSearchActions } from '../../../store/search.ts'

export const AppliedFiltersButton = () => {
  const { toggleAppliedFiltersModal } = useSearchActions()
  const appliedFilters = useAppliedFilters()
  const hasAppliedFilters = appliedFilters.length > 0

  return (
    <IconButton
      sx={{
        'color': hasAppliedFilters ? 'primary.main' : 'text.secondary',
        'position': 'relative',
        'backgroundColor': hasAppliedFilters ? 'rgba(234, 43, 6, 0.08)' : 'transparent',
        'borderRadius': '10px',
        '&:hover': {
          backgroundColor: hasAppliedFilters ? 'rgba(234, 43, 6, 0.12)' : 'rgba(0,0,0,0.04)',
          transform: 'scale(1.05)',
        },
        'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      size="small"
      onClick={toggleAppliedFiltersModal}
    >
      <FilterListIcon sx={{ fontSize: '20px' }} />
      {hasAppliedFilters && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 4, 
            right: 4, 
            width: 8, 
            height: 8, 
            bgcolor: 'primary.main', 
            borderRadius: '50%',
            border: (theme: Theme) => `1.5px solid ${theme.palette.background.paper}`,
            boxShadow: '0 0 0 1px rgba(234, 43, 6, 0.2)'
          }} 
        />
      )}
    </IconButton>
  )
}
