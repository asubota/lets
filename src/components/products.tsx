import { type FC, lazy, Suspense } from 'react'

import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import { Box } from '@mui/material'

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
import { useAppliedFilters } from '../store/appliedFilters'

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
}) => {
  const view = useAppView()
  const uniqueVendors = getUniqueVendors(products)
  const searchVendors = useSearchVendors()
  const appliedFilters = useAppliedFilters()

  if (products.length === 0 && search.length === 0) {
    return <Welcome />
  }

  if (products.length === 0 && search.length > 0) {
    return <NoResults />
  }

  const filteredList =
    searchVendors.length === 0 ? products : products.filter((product) => searchVendors.includes(product.vendor))

  const filteredByVendor =
    !isFavoritePage && appliedFilters.length > 0
      ? filteredList.filter((product) => appliedFilters.includes(product.vendor))
      : filteredList

  return (
    <>
      <Toolbar
        hasPasteIn={hasPasteIn}
        hasFavoritesSorting={hasFavoritesSorting}
        hasGoogle={hasGoogle}
        hasColumnsConfig={hasColumnsConfig}
        total={filteredByVendor.length}
        uniqueVendors={uniqueVendors}
        filteredSearch={searchVendors.length > 0 && searchVendors.length < uniqueVendors.length}
      />

      {filteredByVendor.length === 0 && (
        <Box
          sx={{
            color: 'text.secondary',
            typography: 'h4',
            textAlign: 'center',
            mt: 6,
          }}
        >
          <DoNotDisturbAltIcon sx={{ fontSize: '140px', color: 'text.secondary' }} />
        </Box>
      )}

      {filteredByVendor.length > 0 && (
        <>
          {view === 'tile' && (
            <Suspense fallback={<ProductsSkeleton />}>
              <TilesView list={filteredByVendor} search={search} isFavoritePage={isFavoritePage} />
            </Suspense>
          )}
          {view === 'table' && (
            <Suspense fallback={<ProductsSkeleton />}>
              <TableView list={filteredByVendor} search={search} />
            </Suspense>
          )}
          {view === 'info' && (
            <Suspense fallback={<ProductsSkeleton />}>
              <InfoView list={filteredByVendor} />
            </Suspense>
          )}
        </>
      )}

      <ScrollToTop />
    </>
  )
}

export default Products
