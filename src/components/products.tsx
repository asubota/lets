import { type FC, lazy, Suspense } from 'react'

import { NoResults } from './no-results.tsx'
import { ProductsSkeleton } from './products-skeleton.tsx'
import { RangeSearch } from './range-search.tsx'
import { type SharedTilesViewProps } from './tiles-view.tsx'
import { Welcome } from './welcome.tsx'
import { useAppView, useSearchOptions } from '../store'
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

const getMinMax = (items: Product[]): [number, number] => {
  if (items.length === 0) {
    return [0, 0]
  }

  let min = items[0].price
  let max = items[0].price

  for (const product of items) {
    if (product.price < min) min = product.price
    if (product.price > max) max = product.price
  }

  return [min, max]
}

const Products: FC<ProductsProps> = ({
  products,
  search,
  hasFavoritesSorting,
  hasPasteIn,
  hasGoogle,
  hasColumnsConfig,
  isFavoritePage,
}) => {
  const view = useAppView()
  const uniqueVendors = getUniqueVendors(products)
  const searchVendors = useSearchVendors()
  const { show, priceMin, priceMax } = useSearchOptions()

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

  const [min, max] = getMinMax(filteredList)

  const filteredByPrice = show
    ? filteredList.filter((p) => p.price >= priceMin && p.price <= priceMax)
    : filteredList

  return (
    <>
      <Toolbar
        hasPasteIn={hasPasteIn}
        hasFavoritesSorting={hasFavoritesSorting}
        hasGoogle={hasGoogle}
        hasColumnsConfig={hasColumnsConfig}
        total={filteredByPrice.length}
        uniqueVendors={uniqueVendors}
        filteredSearch={searchVendors.length > 0 && searchVendors.length < uniqueVendors.length}
      />

      {show && <RangeSearch min={min} max={max} />}

      {view === 'tile' && (
        <Suspense fallback={<ProductsSkeleton />}>
          <TilesView list={filteredByPrice} search={search} isFavoritePage={isFavoritePage} />
        </Suspense>
      )}
      {view === 'table' && (
        <Suspense fallback={<ProductsSkeleton />}>
          <TableView list={filteredByPrice} search={search} />
        </Suspense>
      )}
      {view === 'info' && (
        <Suspense fallback={<ProductsSkeleton />}>
          <InfoView list={filteredByPrice} />
        </Suspense>
      )}

      <ScrollToTop />
    </>
  )
}

export default Products
