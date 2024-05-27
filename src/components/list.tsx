import { FC } from 'react'

import { TilesView } from './tiles-view.tsx'
import { TableView } from './table-view.tsx'
import { Welcome } from './welcome.tsx'
import { NoResults } from './no-results.tsx'

import { Toolbar } from './toolbar.tsx'
import { useAppView } from '../store'
import { getUniqueVendors } from '../tools.tsx'
import { Product } from '../types.ts'
import { useSearchVendors } from '../store/search.ts'

export const List: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  const view = useAppView()
  const uniqueVendors = getUniqueVendors(list)
  const searchVendors = useSearchVendors()

  const View = view === 'tile' ? TilesView : TableView

  if (list.length === 0 && search.length === 0) {
    return <Welcome />
  }

  if (list.length === 0 && search.length > 0) {
    return <NoResults />
  }

  const filteredList =
    searchVendors.length === 0
      ? list
      : list.filter((product) => searchVendors.includes(product.vendor))

  return (
    <>
      <Toolbar
        total={filteredList.length}
        uniqueVendors={uniqueVendors}
        filteredSearch={
          searchVendors.length > 0 &&
          searchVendors.length < uniqueVendors.length
        }
      />
      <View list={filteredList} search={search} />
    </>
  )
}
