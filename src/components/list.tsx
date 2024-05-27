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
  const vendors = useSearchVendors()

  const View = view === 'tile' ? TilesView : TableView

  if (list.length === 0 && search.length === 0) {
    return <Welcome />
  }

  if (list.length === 0 && search.length > 0) {
    return <NoResults />
  }

  const filteredList =
    vendors.length === 0
      ? list
      : list.filter((product) => vendors.includes(product.vendor))

  return (
    <>
      <Toolbar total={filteredList.length} uniqueVendors={uniqueVendors} />
      <View list={filteredList} search={search} />
    </>
  )
}
