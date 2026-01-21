import { lazy, Suspense } from 'react'

import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import { Box } from '@mui/material'

import { NoResults } from './no-results.tsx'
import { ProductsSkeleton } from './products-skeleton.tsx'
import { type SharedTilesViewProps } from './tiles-view.tsx'
import { Welcome } from './welcome.tsx'
import { useAppView } from '../store'
import { useAppliedFilters } from '../store/appliedFilters.ts'
import { type Product } from '../types.ts'
import { ScrollToTop } from './scroll-to-top.tsx'
import { type SharedToolbarProps, Toolbar } from './toolbar/toolbar.tsx'

const TableView = lazy(() => import('./table-view.tsx'))
const TilesView = lazy(() => import('./tiles-view.tsx'))
const InfoView = lazy(() => import('./info-view.tsx'))

interface ProductsProps extends SharedToolbarProps, SharedTilesViewProps {
  products: Product[]
  search: string
  isFavoritePage?: boolean
}

const Products = ({
  products,
  search,
  hasFavoritesSorting,
  hasPasteIn,
  hasGoogle,
  hasColumnsConfig,
  isFavoritePage,
}: ProductsProps) => {
  const view = useAppView()
  const appliedFilters = useAppliedFilters()

  if (products.length === 0 && search.length === 0 && appliedFilters.length === 0) {
    return <Welcome />
  }

  if (products.length === 0 && (search.length > 0 || appliedFilters.length > 0)) {
    return <NoResults />
  }

  return (
    <>
      <Toolbar
        hasPasteIn={hasPasteIn}
        hasFavoritesSorting={hasFavoritesSorting}
        hasGoogle={hasGoogle}
        hasColumnsConfig={hasColumnsConfig}
        hasAppliedFilters={!isFavoritePage}
        total={products.length}
        filteredSearch={false}
      />

      {products.length === 0 && (
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

      {products.length > 0 && (
        <>
          {view === 'tile' && (
            <Suspense fallback={<ProductsSkeleton />}>
              <TilesView list={products} search={search} isFavoritePage={isFavoritePage} />
            </Suspense>
          )}
          {view === 'table' && (
            <Suspense fallback={<ProductsSkeleton />}>
              <TableView list={products} search={search} />
            </Suspense>
          )}
          {view === 'info' && (
            <Suspense fallback={<ProductsSkeleton />}>
              <InfoView list={products} />
            </Suspense>
          )}
        </>
      )}

      <ScrollToTop />
    </>
  )
}

export default Products
