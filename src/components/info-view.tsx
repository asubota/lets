import { Stack } from '@mui/material'
import { Product } from '../types.ts'
import { Info } from './info.tsx'
import { getFavoriteId } from '../tools.tsx'

interface InfoViewProps {
  list: Product[]
}

const InfoView = ({ list }: InfoViewProps) => {
  return (
    <Stack direction="column" spacing={1} id="tiles-view">
      {list.map((p) => {
        const favoriteId = getFavoriteId(p)
        const key = `${favoriteId}:${p.price}`

        return <Info key={key} p={p} />
      })}
    </Stack>
  )
}

export default InfoView
