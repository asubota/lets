import { FC, useState } from 'react'
import { Box } from '@mui/material'
import {
  SearchField,
  List,
  LimitSearchModal,
  TableSettingsModal,
} from './components'
import { useHistoryActions } from './store'
import { useSearch } from './use-data.ts'
import { useSearchActions } from './store/search.ts'

export const Shell: FC = () => {
  const [search, setSearch] = useState('')
  const { add } = useHistoryActions()
  const list = useSearch(search)

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
      <SearchField onSubmit={handleSubmit} />
      <List list={list} search={search} />

      <LimitSearchModal list={list} />
      <TableSettingsModal />
    </Box>
  )
}
