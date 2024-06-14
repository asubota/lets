import { FC, useRef, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import {
  SearchField,
  List,
  LimitSearchModal,
  TableSettingsModal,
} from './components'
import { useAppActions, useHistoryActions, useShowFavs } from './store'
import { useFavs, useIsLoading, useSearch } from './use-data.ts'
import { useSearchActions } from './store/search.ts'
import StarIcon from '@mui/icons-material/Star'

export const Shell: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [search, setSearch] = useState('')
  const { add } = useHistoryActions()
  const list = useSearch(search)
  const favs = useFavs()
  const showFavs = useShowFavs()
  const { toggleFavs } = useAppActions()
  const loading = useIsLoading()
  const { resetSearchVendors } = useSearchActions()

  const handleSubmit = ({ input }: { input: string }) => {
    const term = input.trim()
    resetSearchVendors()
    setSearch(term)

    if (term.length > 2) {
      add(term)
    }
  }

  return (
    <Box sx={{ p: 1, pt: 0 }} className="bg">
      <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }} ref={ref}>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            disabled={loading}
            onClick={toggleFavs}
            size="small"
            sx={{ color: showFavs ? 'warning.light' : 'secondary.light' }}
          >
            <StarIcon />
          </IconButton>
        </Box>
        <SearchField
          onSubmit={handleSubmit}
          el={ref.current}
          disabled={showFavs}
        />
      </Box>

      <List list={showFavs ? favs : list} search={search} />

      <LimitSearchModal list={list} />
      <TableSettingsModal />
    </Box>
  )
}
