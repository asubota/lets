import { type FC } from 'react'
import { motion } from 'framer-motion'

import { Box } from '@mui/material'

import { type Product } from '../types.ts'
import { Tile } from './tile.tsx'
import { useFavoriteIds } from '../api.ts'
import { useGetChangedProducts } from '../hooks/use-get-changed-products.hook.ts'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll.ts'
import { getFavoriteId } from '../tools.tsx'

export interface SharedTilesViewProps {
  isFavoritePage?: boolean
}

interface TilesViewProps extends SharedTilesViewProps {
  list: Product[]
  search: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const TilesView: FC<TilesViewProps> = ({ list, search, isFavoritePage = false }) => {
  const favoriteIds = useFavoriteIds()
  const changedProducts = useGetChangedProducts()
  const skus = changedProducts.map((p) => p.sku)
  const { visibleList, hasMore, loadMoreRef } = useInfiniteScroll(list)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      id="tiles-view"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '0px 0px 16px 0px',
      }}
    >
      {visibleList.map((p) => {
        const favoriteId = getFavoriteId(p)
        const key = `${favoriteId}:${p.price}`

        return (
          <motion.div key={key} variants={item}>
            <Tile
              p={p}
              search={search}
              isFavorite={favoriteIds.includes(favoriteId)}
              isChanged={skus.includes(p.sku)}
              isFavoritePage={isFavoritePage}
            />
          </motion.div>
        )
      })}

      {hasMore && <Box ref={loadMoreRef} sx={{ p: 1 }} />}
    </motion.div>
  )
}

export default TilesView
