import { FC, useState } from 'react'
import { Box } from '@mui/material'
import {
  SearchField,
  List,
  LimitSearchModal,
  TableSettingsModal,
} from './components'
import { useHistoryActions, useShowFavs } from './store'
import { useFavs, useSearch } from './use-data.ts'
import { useSearchActions } from './store/search.ts'
import { AppBar } from './components/app-bar.tsx'

export const Shell: FC = () => {
  const [search, setSearch] = useState('')
  const { add } = useHistoryActions()
  const list = useSearch(search)
  const favs = useFavs()
  const showFavs = useShowFavs()

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
    <Box sx={{ p: 1 }} className="bg">
      <SearchField onSubmit={handleSubmit} disabled={showFavs} />

      <AppBar />

      <List list={showFavs ? favs : list} search={search} />

      <LimitSearchModal list={list} />
      <TableSettingsModal />
    </Box>
  )
}
