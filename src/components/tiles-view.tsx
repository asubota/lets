import { Box, Chip, Stack } from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { getHighlightedText } from '../tools.tsx'
import CheckIcon from '@mui/icons-material/Check'

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
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto auto',
        gridTemplateAreas: ` 
          "name"
          "sku"
          "pricevendor"
        `,
      }}
    >
      <Box sx={{ gridArea: 'name', textAlign: 'left' }}>
        {getHighlightedText(p['name'], search)}
      </Box>

      <Box sx={{ gridArea: 'sku', textAlign: 'left' }}>
        <Chip label={getHighlightedText(p['sku'], search)} size="small" />
      </Box>

      <Box
        sx={{
          gridArea: 'pricevendor',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '8px',
        }}
      >
        <Chip
          label={p['price']}
          color="secondary"
          size="small"
          variant="outlined"
          sx={{ borderWidth: '2px' }}
        />
        {p['vendor'] !== 'base' ? (
          <Chip
            label={p['vendor']}
            color="secondary"
            size="small"
            variant="outlined"
            sx={{ borderWidth: '2px' }}
          />
        ) : (
          <Chip label={p['vendor']} color="primary" size="small" />
        )}

        {p['stock'] === '-' ? (
          <Box
            sx={{
              ml: 'auto',
              border: '2px solid red',
              fontSize: 0,
            }}
          >
            <CheckIcon color="primary" />
          </Box>
        ) : (
          <Chip
            label={p['stock']}
            color="primary"
            size="small"
            variant="outlined"
            sx={{ borderRadius: 0, ml: 'auto', borderWidth: '2px' }}
          />
        )}
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
