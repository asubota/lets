import { Box, Chip, Stack } from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { getHighlightedText } from '../tools.tsx'

const Tile: FC<{ p: Product; search: string }> = ({ p, search }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        p: 1,
        display: 'grid',
        rowGap: '12px',
        columnGap: '4px',
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: ` 
          "name name"
          "sku pricevendor"
        `,
      }}
    >
      <Box sx={{ gridArea: 'name', textAlign: 'left' }}>
        {getHighlightedText(p['name'], search)}
      </Box>

      <Box sx={{ gridArea: 'sku' }}>
        <Chip label={getHighlightedText(p['sku'], search)} size="small" />
      </Box>

      <Box
        sx={{
          gridArea: 'pricevendor',
          display: 'flex',
          justifyContent: 'end',
          gap: '12px',
        }}
      >
        <Chip
          label={p['price']}
          color="success"
          size="small"
          variant="outlined"
        />
        {p['vendor'] !== 'base' ? (
          <Chip
            label={p['vendor']}
            color="secondary"
            size="small"
            variant="outlined"
          />
        ) : (
          <Chip label={p['vendor']} color="primary" size="small" />
        )}

        <Chip
          label={p['stock']}
          color="primary"
          size="small"
          variant="outlined"
          sx={{ borderRadius: 0 }}
        />
      </Box>
    </Box>
  )
}

export const TilesView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  return (
    <Stack direction="column" spacing={1}>
      {list.map((row) => (
        <Tile p={row} search={search} key={row['sku'] + row['vendor']} />
      ))}
    </Stack>
  )
}
