import { FC, useState } from 'react'
import { Box, Switch, Typography } from '@mui/material'
import { TilesView } from './tiles-view.tsx'
import { TableView } from './table-view.tsx'
import { useSearch } from '../use-data.ts'
import { Welcome } from './welcome.tsx'
import { NoResults } from './no-results.tsx'

export const List: FC<{ search: string }> = ({ search }) => {
  const [value, setValue] = useState(true)
  const list = useSearch(search)
  const View = value ? TilesView : TableView

  if (list.length === 0 && search.length === 0) {
    return <Welcome />
  }

  if (list.length === 0 && search.length > 0) {
    return <NoResults />
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 1,
          pb: 1,
        }}
      >
        <Typography
          component="div"
          color="secondary"
          variant="body2"
          sx={{ fontWeight: 'bold' }}
        >
          Total: {list.length}
        </Typography>
        <Switch value={value} onChange={(_, checked) => setValue(!checked)} />
      </Box>

      <View list={list} search={search} />
    </>
  )
}
