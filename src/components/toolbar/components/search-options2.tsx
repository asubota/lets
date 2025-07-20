import { useEffect } from 'react'

import SavedSearchIcon from '@mui/icons-material/SavedSearch'
import { IconButton } from '@mui/material'

import { useAppActions, useSearchOptions } from '../../../store'

interface SearchOptionsProps {
  min: number
  max: number
}

export const SearchOptions2 = ({ min, max }: SearchOptionsProps) => {
  const { show2 } = useSearchOptions()
  const { setSearchOptions } = useAppActions()

  const handleClick = () => {
    if (show2) {
      setSearchOptions({ show: false, show2: false, rangeMax: 0, rangeMin: 0, priceMin: 0, priceMax: 0 })
    } else {
      setSearchOptions({ show: false, show2: true, priceMin: min, priceMax: max, rangeMin: min, rangeMax: max })
    }
  }

  useEffect(() => {
    return () => setSearchOptions({ show: false, show2: false, rangeMax: 0, rangeMin: 0, priceMin: 0, priceMax: 0 })
  }, [setSearchOptions])

  if (min === max) {
    return null
  }

  return (
    <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleClick}>
      <SavedSearchIcon />
    </IconButton>
  )
}
