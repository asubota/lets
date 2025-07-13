import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { IconButton } from '@mui/material'

import { useAppActions, useSearchOptions } from '../../../store'

export const SearchOptions = () => {
  const { show } = useSearchOptions()
  const { setSearchOptions } = useAppActions()
  const handleClick = () => {
    if (show) {
      setSearchOptions({ show: false, rangeMax: 0, rangeMin: 0, priceMin: 0, priceMax: 0 })
    } else {
      setSearchOptions({ show: true })
    }
  }

  return (
    <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleClick}>
      <ManageSearchIcon />
    </IconButton>
  )
}
