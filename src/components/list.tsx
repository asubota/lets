import { FC, useState } from 'react'
import { Box, Switch, Typography } from '@mui/material'
import { TilesView } from './tiles-view.tsx'
import { TableView } from './table-view.tsx'
import { useSearch } from '../use-data.ts'

export const List: FC<{ search: string }> = ({ search }) => {
  const [value, setValue] = useState(true)
  const list = useSearch(search)
  const View = value ? TilesView : TableView

  if (list.length === 0) {
    return (
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 4 }}>
        ?
      </Typography>
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography component="div" color="secondary" variant="body2">
          Total: {list.length}
        </Typography>
        <Switch value={value} onChange={(_, checked) => setValue(checked)} />
      </Box>

      <View list={list} search={search} />
    </>
  )
}
