import { type FC, lazy, Suspense } from 'react'

import { NoResults } from './no-results.tsx'
import { ProductsSkeleton } from './products-skeleton.tsx'
import { type SharedTilesViewProps } from './tiles-view.tsx'
import { Welcome } from './welcome.tsx'
import { useAppView } from '../store'
import { useSearchVendors } from '../store/search.ts'
import { getUniqueVendors } from '../tools.tsx'
import { type Product } from '../types.ts'
import { ScrollToTop } from './scroll-to-top.tsx'
import { type SharedToolbarProps, Toolbar } from './toolbar/toolbar.tsx'

const TableView = lazy(() => import('./table-view.tsx'))
const TilesView = lazy(() => import('./tiles-view.tsx'))
const InfoView = lazy(() => import('./info-view.tsx'))

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
        <Suspense fallback={<ProductsSkeleton />}>
          <TilesView
            list={filteredList}
            search={search}
            isFavoritePage={isFavoritePage}
          />
        </Suspense>
      )}
      {view === 'table' && (
        <Suspense fallback={<ProductsSkeleton />}>
          <TableView list={filteredList} search={search} />
        </Suspense>
      )}
      {view === 'info' && (
        <Suspense fallback={<ProductsSkeleton />}>
          <InfoView list={filteredList} />
        </Suspense>
      )}

      <ScrollToTop />
    </>
  )
}

export default Products
