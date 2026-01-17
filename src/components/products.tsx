import { type FC, lazy, Suspense } from 'react'

import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import { Box } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

import { NoResults } from './no-results.tsx'
import { ProductsSkeleton } from './products-skeleton.tsx'
import { RangeSearch } from './range-search.tsx'
import { type SharedTilesViewProps } from './tiles-view.tsx'
import { Welcome } from './welcome.tsx'
import { useAppView, useSearchOptions } from '../store'
import { useSearchVendors } from '../store/search.ts'
import { getPriceMinMax, getUniqueVendors } from '../tools.tsx'
import { type Product } from '../types.ts'
import { RangeSearch2 } from './range-search2.tsx'
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
  const { show, show2, priceMin, priceMax } = useSearchOptions()
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

  const [min, max] = getPriceMinMax(filteredByVendor)

  const filteredByPrice =
    show || show2 ? filteredByVendor.filter((p) => p.price >= priceMin && p.price <= priceMax) : filteredByVendor

  return (
    <>
      <Toolbar
        min={min}
        max={max}
        hasPasteIn={hasPasteIn}
        hasFavoritesSorting={hasFavoritesSorting}
        hasGoogle={hasGoogle}
        hasColumnsConfig={hasColumnsConfig}
        total={filteredByPrice.length}
        uniqueVendors={uniqueVendors}
        filteredSearch={searchVendors.length > 0 && searchVendors.length < uniqueVendors.length}
      />

      <AnimatePresence>
        {show && (
          <Box
            component={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            sx={{ overflow: 'hidden' }}
          >
            <RangeSearch />
          </Box>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show2 && (
          <Box
            component={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            sx={{ overflow: 'hidden' }}
          >
            <RangeSearch2 />
          </Box>
        )}
      </AnimatePresence>

      {filteredByPrice.length === 0 && (
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
