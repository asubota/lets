import { IconButton } from '@mui/material'
import { FC } from 'react'
import { useIsRoute } from '../hooks/use-is-route.hook.ts'
import DateRangeIcon from '@mui/icons-material/DateRange'
import NotesIcon from '@mui/icons-material/Notes'
import { useAppActions, useAppSort } from '../store'

export const Sorting: FC = () => {
  const isFavouritesRoute = useIsRoute('/favorites')
  const sort = useAppSort()
  const { setSort } = useAppActions()
  const handleSortChange = () => setSort(sort === 'note' ? 'date' : 'note')

  if (!isFavouritesRoute) {
    return null
  }

  return (
    <IconButton size="small" sx={{ mr: 2 }} onClick={handleSortChange}>
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
