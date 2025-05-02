import { type FC } from 'react'

import { Stack } from '@mui/material'

import { type Product } from '../types.ts'
import { Tile } from './tile.tsx'
import { useFavoriteIds } from '../api.ts'
import { useGetChangedProducts } from '../hooks/use-get-changed-products.hook.ts'
import { getFavoriteId } from '../tools.tsx'

export interface SharedTilesViewProps {
  isFavoritePage?: boolean
}

interface TilesViewProps extends SharedTilesViewProps {
  list: Product[]
  search: string
}

const TilesView: FC<TilesViewProps> = ({
  list,
  search,
  isFavoritePage = false,
}) => {
  const favoriteIds = useFavoriteIds()
  const changedProducts = useGetChangedProducts()
  const skus = changedProducts.map((p) => p.sku)

  return (
    <Stack direction="column" spacing={1} id="tiles-view">
      {list.map((p) => {
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
    </Stack>
  )
}

export default TilesView
