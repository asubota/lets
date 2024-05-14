import { FC, useState } from 'react'
import { Box } from '@mui/material'
import { SearchField, List } from './components'

export const Shell: FC = () => {
  const [search, setSearch] = useState('')

  return (
    <Box sx={{ p: 1, pt: 0 }} className="bg">
      <SearchField onSubmit={({ input }) => setSearch(input)} />
      <List search={search} />
    </Box>
  )
}
