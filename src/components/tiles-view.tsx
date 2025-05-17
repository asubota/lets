import { type FC } from 'react'

import { Box, Stack } from '@mui/material'

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

const TilesView: FC<TilesViewProps> = ({ list, search, isFavoritePage = false }) => {
  const favoriteIds = useFavoriteIds()
  const changedProducts = useGetChangedProducts()
  const skus = changedProducts.map((p) => p.sku)
  const { visibleList, hasMore, loadMoreRef } = useInfiniteScroll(list)

  return (
    <Stack direction="column" spacing={1} id="tiles-view">
      {visibleList.map((p) => {
        const favoriteId = getFavoriteId(p)
        const key = `${favoriteId}:${p.price}`

        return (
          <Tile
            key={key}
            p={p}
            search={search}
            isFavorite={favoriteIds.includes(favoriteId)}
            isChanged={skus.includes(p.sku)}
            isFavoritePage={isFavoritePage}
          />
        )
      })}

      {hasMore && <Box ref={loadMoreRef} sx={{ p: 1 }} />}
    </Stack>
  )
}

export default TilesView
