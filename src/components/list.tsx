import { FC } from 'react'

import { TilesView } from './tiles-view.tsx'
import { TableView } from './table-view.tsx'
import { useSearch } from '../use-data.ts'
import { Welcome } from './welcome.tsx'
import { NoResults } from './no-results.tsx'

import { useTableSettings } from './use-table-settings.ts'
import { TableSettings } from './table-settings.tsx'
import { Toolbar } from './toolbar.tsx'
import { useAppView } from '../store'

export const List: FC<{ search: string }> = ({ search }) => {
  const list = useSearch(search)
  const view = useAppView()
  const { open, toggle } = useTableSettings()
  const View = view === 'tile' ? TilesView : TableView

  if (list.length === 0 && search.length === 0) {
    return <Welcome />
  }

  if (list.length === 0 && search.length > 0) {
    return <NoResults />
  }

  return (
    <>
      <Toolbar total={list.length} />
      <TableSettings open={open} handleClose={toggle} />
      <View list={list} search={search} />
    </>
  )
}
