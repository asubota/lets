import { FC, lazy, Suspense } from 'react'

import { type SharedTilesViewProps } from './tiles-view.tsx'
import { Welcome } from './welcome.tsx'
import { NoResults } from './no-results.tsx'

import { useAppView } from '../store'
import { getUniqueVendors } from '../tools.tsx'
import { Product } from '../types.ts'
import { useSearchVendors } from '../store/search.ts'
import { ScrollToTop } from './scroll-to-top.tsx'
import { type SharedToolbarProps, Toolbar } from './toolbar/toolbar.tsx'

const TableView = lazy(() => import('./table-view.tsx'))
const TilesView = lazy(() => import('./tiles-view.tsx'))

interface ProductsProps extends SharedToolbarProps, SharedTilesViewProps {
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
  isFavoritePage,
  hasCart,
}) => {
  const view = useAppView()
  const uniqueVendors = getUniqueVendors(products)
  const searchVendors = useSearchVendors()

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
        search={search}
        hasCart={hasCart}
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
      {view === 'tile' && (
        <Suspense>
          <TilesView
            list={filteredList}
            search={search}
            isFavoritePage={isFavoritePage}
          />
        </Suspense>
      )}
      {view === 'table' && (
        <Suspense>
          <TableView list={filteredList} search={search} />
        </Suspense>
      )}

      <ScrollToTop />
    </>
  )
}

export default Products
