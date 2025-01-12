import { FC } from 'react'

import { TilesView } from './tiles-view.tsx'
import { TableView } from './table-view.tsx'
import { Welcome } from './welcome.tsx'
import { NoResults } from './no-results.tsx'

import { useAppView } from '../store'
import { getUniqueVendors } from '../tools.tsx'
import { Product } from '../types.ts'
import { useSearchVendors } from '../store/search.ts'
import { ScrollToTop } from './scroll-to-top.tsx'
import { SharedToolbarProps, Toolbar } from './toolbar/toolbar.tsx'

interface ProductsProps extends SharedToolbarProps {
  products: Product[]
  search: string
}

const Products: FC<ProductsProps> = ({
  products,
  search,
  hasFavoritesSorting,
  hasPasteIn,
  hasGoogle,
  hasColumnsConfig,
}) => {
  const view = useAppView()
  const uniqueVendors = getUniqueVendors(products)
  const searchVendors = useSearchVendors()

  const View = view === 'tile' ? TilesView : TableView

  if (products.length === 0 && search.length === 0) {
    return <Welcome />
  }

  if (products.length === 0 && search.length > 0) {
    return <NoResults />
  }

  const filteredList =
    searchVendors.length === 0
      ? products
      : products.filter((product) => searchVendors.includes(product.vendor))

  return (
    <>
      <Toolbar
        hasPasteIn={hasPasteIn}
        hasFavoritesSorting={hasFavoritesSorting}
        hasGoogle={hasGoogle}
        hasColumnsConfig={hasColumnsConfig}
        total={filteredList.length}
        uniqueVendors={uniqueVendors}
        filteredSearch={
          searchVendors.length > 0 &&
          searchVendors.length < uniqueVendors.length
        }
      />
      <View list={filteredList} search={search} />
      <ScrollToTop />
    </>
  )
}

export default Products
