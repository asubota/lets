import { FC, useState } from 'react'
import { Box } from '@mui/material'
import {
  SearchField,
  List,
  LimitSearchModal,
  TableSettingsModal,
} from './components'
import { useAppMode, useHistoryActions } from './store'
import { useFavs, useSearch } from './use-data.ts'
import { useSearchActions } from './store/search.ts'
import { AppBar } from './components/app-bar.tsx'
import { Scanner } from './components/scanner.tsx'

export const Shell: FC = () => {
  const [search, setSearch] = useState('')
  const { add } = useHistoryActions()
  const list = useSearch(search)
  const favs = useFavs()
  const mode = useAppMode()

  const { resetSearchVendors } = useSearchActions()

  const handleSubmit = ({ input }: { input: string }) => {
    const term = input.trim()
    resetSearchVendors()
    setSearch(term)

    if (term.length > 2) {
      add(term)
    }
  }

  return mode === 'scan' ? (
    <Scanner
      onSubmit={({ input }) => {
        setSearch(input)
      }}
    />
  ) : (
    <Box sx={{ p: 1 }} className="bg">
      <SearchField
        onSubmit={handleSubmit}
        disabled={mode === 'favs'}
        outerValue={search}
      />
      <AppBar />
      <List list={mode === 'favs' ? favs : list} search={search} />
      <LimitSearchModal list={list} />
      <TableSettingsModal />
    </Box>
  )
}
