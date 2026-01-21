import FilterListIcon from '@mui/icons-material/FilterList'
import { IconButton } from '@mui/material'

import { useAppliedFilters } from '../../../store/appliedFilters.ts'
import { useSearchActions } from '../../../store/search.ts'
import { RedDot } from '../../red-dot.tsx'

export const AppliedFiltersButton = () => {
  const { toggleAppliedFiltersModal } = useSearchActions()
  const appliedFilters = useAppliedFilters()
  const hasAppliedFilters = appliedFilters.length > 0

  return (
    <IconButton
      sx={{
        color: 'text.secondary',
        position: 'relative',
      }}
      size="small"
      onClick={toggleAppliedFiltersModal}
    >
      <FilterListIcon />
      {hasAppliedFilters && <RedDot />}
    </IconButton>
  )
}
