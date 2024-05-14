import { Box, Chip, Paper, Stack } from '@mui/material'
import { FC } from 'react'
import { Product } from '../types.ts'
import { getHighlightedText } from '../tools.tsx'
import CheckIcon from '@mui/icons-material/Check'

const Tile: FC<{ p: Product; search: string }> = ({ p, search }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        display: 'grid',
        rowGap: '12px',
        columnGap: '4px',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto auto',
        gridTemplateAreas: ` 
          "name"
          "sku"
          "meta"
        `,
      }}
    >
      <Box
        sx={{ gridArea: 'name', textAlign: 'left', wordBreak: 'break-word' }}
      >
        {getHighlightedText(p['name'], search)}
      </Box>

      <Box sx={{ gridArea: 'sku', textAlign: 'left' }}>
        <Chip label={getHighlightedText(p['sku'], search)} size="small" />
      </Box>

      <Box
        sx={{
          gridArea: 'meta',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Chip
          label={p['price']}
          color="secondary"
          size="small"
          variant="outlined"
          sx={{ borderWidth: '2px', borderColor: 'secondary.main' }}
        />
        {p['vendor'] !== 'base' ? (
          <Chip
            label={p['vendor']}
            color="secondary"
            size="small"
            variant="outlined"
            sx={{ borderWidth: '2px', borderColor: 'secondary.main' }}
          />
        ) : (
          <Chip label={p['vendor']} color="primary" size="small" />
        )}

        {p['stock'] === '-' ? (
          <Box
            sx={{
              'ml': 'auto',
              'fontSize': 0,
              'border': '2px solid',
              'borderColor': 'primary.main',
              '& > svg': {
                fontSize: '16px',
              },
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
    </Paper>
  )
}

export const TilesView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  return (
    <Stack direction="column" spacing={2}>
      {list.map((row) => (
        <Tile p={row} search={search} key={row['sku'] + row['vendor']} />
      ))}
    </Stack>
  )
}
