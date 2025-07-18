import { type FC } from 'react'

import DateRangeIcon from '@mui/icons-material/DateRange'
import NotesIcon from '@mui/icons-material/Notes'
import { IconButton } from '@mui/material'

import { useAppActions, useAppSort } from '../store'

export const Sorting: FC = () => {
  const sort = useAppSort()
  const { setSort } = useAppActions()
  const handleSortChange = () => setSort(sort === 'note' ? 'date' : 'note')

  return (
    <IconButton size="small" onClick={handleSortChange}>
      {sort === 'date' && (
        <>
          <DateRangeIcon sx={{ color: 'text.primary' }} />
          <NotesIcon sx={{ color: 'text.secondary', fontSize: '14px' }} />
        </>
      )}

      {sort === 'note' && (
        <>
          <DateRangeIcon sx={{ color: 'text.secondary', fontSize: '14px' }} />
          <NotesIcon sx={{ color: 'text.primary' }} />
        </>
      )}
    </IconButton>
  )
}
