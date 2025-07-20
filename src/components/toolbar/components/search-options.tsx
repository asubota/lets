import { useEffect } from 'react'

import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { IconButton } from '@mui/material'

import { useAppActions, useSearchOptions } from '../../../store'

interface SearchOptionsProps {
  min: number
  max: number
}

export const SearchOptions = ({ min, max }: SearchOptionsProps) => {
  const { show } = useSearchOptions()
  const { setSearchOptions } = useAppActions()

  const handleClick = () => {
    if (show) {
      setSearchOptions({ show: false, rangeMax: 0, rangeMin: 0, priceMin: 0, priceMax: 0 })
    } else {
      setSearchOptions({ show: true, priceMin: min, priceMax: max, rangeMin: min, rangeMax: max })
    }
  }

  useEffect(() => {
    return () => setSearchOptions({ show: false, rangeMax: 0, rangeMin: 0, priceMin: 0, priceMax: 0 })
  }, [setSearchOptions])

  if (min === max) {
    return null
  }

  return (
    <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleClick}>
      <ManageSearchIcon />
    </IconButton>
  )
}
