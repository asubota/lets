import { Stack } from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { useFavsActions, useFavsItems } from '../store/favs.ts'
import { Tile } from './tile.tsx'
import { useIsRoute } from '../hooks/use-is-route.hook.ts'

export const TilesView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  const favs = useFavsItems()
  const { toggle } = useFavsActions()
  const isFavouritesRoute = useIsRoute('/favorites')

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
            iFavouriteRoute={isFavouritesRoute}
            toggle={() => toggle(favId)}
          />
        )
      })}
    </Stack>
  )
}
