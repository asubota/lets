import { Stack } from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { useFavsActions, useFavsItems } from '../store/favs.ts'
import { Tile } from './tile.tsx'
import { useIsRoute } from '../hooks/use-is-route.hook.ts'
import { useGetChangedProducts } from '../hooks/use-get-changed-products.hook.ts'

export const TilesView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  const favs = useFavsItems()
  const { toggle } = useFavsActions()
  const isFavouritesRoute = useIsRoute('/favorites')
  const { skus } = useGetChangedProducts()

  return (
    <Stack direction="column" spacing={1} id="tiles-view">
      {list.map((row) => {
        const favId = `${row.sku}:${row.vendor}`
        const key = `${favId}:${row.price}}`

        return (
          <Tile
            key={key}
            p={row}
            search={search}
            isFav={favs.includes(favId)}
            isChanged={skus.includes(row.sku)}
            iFavouriteRoute={isFavouritesRoute}
            toggle={() => toggle(favId)}
          />
        )
      })}
    </Stack>
  )
}
