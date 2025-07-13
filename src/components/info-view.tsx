import { Box, Stack } from '@mui/material'

import { type Product } from '../types.ts'
import { Info } from './info.tsx'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll.ts'
import { getFavoriteId } from '../tools.tsx'

interface InfoViewProps {
  list: Product[]
}

const InfoView = ({ list }: InfoViewProps) => {
  const { visibleList, hasMore, loadMoreRef } = useInfiniteScroll(list)

  return (
    <Stack direction="column" spacing={1}>
      {visibleList.map((p) => {
        const favoriteId = getFavoriteId(p)
        const key = `${favoriteId}:${p.price}`

        return <Info key={key} p={p} />
      })}

      {hasMore && <Box ref={loadMoreRef} sx={{ p: 1 }} />}
    </Stack>
  )
}

export default InfoView
