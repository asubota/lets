import { Stack } from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { useFavsActions, useFavsItems } from '../store/favs.ts'
import { Tile } from './tile.tsx'
import { useMatchRoute } from '@tanstack/react-router'

export const TilesView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  const favs = useFavsItems()
  const { toggle } = useFavsActions()
  const matchRoute = useMatchRoute()
  const iFavouriteRoute = !!matchRoute({ to: '/favorites' })

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
            iFavouriteRoute={iFavouriteRoute}
            toggle={() => toggle(favId)}
          />
        )
      })}
    </Stack>
  )
}
