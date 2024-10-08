import { Stack } from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { Tile } from './tile.tsx'
import { useIsRoute } from '../hooks/use-is-route.hook.ts'
import { useGetChangedProducts } from '../hooks/use-get-changed-products.hook.ts'
import { getFavoriteId } from '../tools.tsx'
import { useFavoriteIds } from '../api.ts'

export const TilesView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  const favoriteIds = useFavoriteIds()
  const isFavouritesRoute = useIsRoute('/favorites')
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
            iFavouriteRoute={isFavouritesRoute}
          />
        )
      })}
    </Stack>
  )
}
