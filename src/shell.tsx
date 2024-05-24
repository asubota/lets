import { FC, useState } from 'react'
import { Box } from '@mui/material'
import { SearchField, List } from './components'
import { useHistoryActions } from './store'

export const Shell: FC = () => {
  const [search, setSearch] = useState('')
  const { add } = useHistoryActions()

  const handleSubmit = ({ input }: { input: string }) => {
    const term = input.trim()
    setSearch(term)

    if (term.length > 2) {
      add(term)
    }
  }

  return (
    <Box sx={{ p: 1, pt: 0 }} className="bg">
      <SearchField onSubmit={handleSubmit} />
      <List search={search} />
    </Box>
  )
}
