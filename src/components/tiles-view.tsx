import { Box, Card, Chip, Stack } from '@mui/material'
import { FC, useState } from 'react'
import { Product } from '../types.ts'
import { getHighlightedText } from '../tools.tsx'
import CheckIcon from '@mui/icons-material/Check'
import ImageIcon from '@mui/icons-material/Image'
import LinkIcon from '@mui/icons-material/Link'
import { DetailsPopup } from './details-popup.tsx'

const Tile: FC<{ p: Product; search: string }> = ({ p, search }) => {
  const [details, setDetails] = useState<Product | null>(null)

  const handleCardClick = () => {
    if (p.link || p.pics) {
      setDetails(p)
    }
  }

  return (
    <>
      {details && (
        <DetailsPopup details={details} onClose={() => setDetails(null)} />
      )}
      <Card
        variant="outlined"
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
        onClick={handleCardClick}
      >
        <Box
          sx={{
            gridArea: 'name',
            textAlign: 'left',
            wordBreak: 'break-word',
          }}
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
            label={`${p['price']} uah`}
            color="secondary"
            size="small"
            variant="outlined"
            sx={{
              borderWidth: '2px',
              borderColor: 'secondary.main',
            }}
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
          {p.pics && <ImageIcon color="info" fontSize="small" />}
          {p.link && <LinkIcon color="info" fontSize="small" />}

          {!p['stock'] ? (
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
      </Card>
    </>
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