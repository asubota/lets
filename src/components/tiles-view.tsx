import { Box, Card, Chip, IconButton, Stack } from '@mui/material'
import { FC, memo, useState } from 'react'
import { Product } from '../types.ts'
import { copyContent, getHighlightedText } from '../tools.tsx'
import ImageIcon from '@mui/icons-material/Image'
import LinkIcon from '@mui/icons-material/Link'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { DetailsPopup } from './details-popup.tsx'
import { Stock } from './stock'
import { useFavsActions, useFavsItems } from '../store/favs.ts'
import { HiddenInput } from './hidden-input.tsx'
import { VendorChip } from './vendor-chip.tsx'
import { RippleText } from './ripple-text.tsx'
import { PriceChip } from './price-chip.tsx'

const Tile: FC<{
  p: Product
  search: string
  isFav: boolean
  toggle(): void
}> = memo(
  ({ p, search, isFav, toggle }) => {
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
          className="product-tile"
          variant="outlined"
          sx={{
            ...(p.missed && {
              backgroundColor: '#ea2b060f',
            }),
            'p': 1,
            'display': 'grid',
            'rowGap': '12px',
            'columnGap': '4px',
            '&:has(input:checked)': {
              borderColor: 'text.secondary',
            },
            'gridTemplateColumns': '1fr',
            'gridTemplateRows': 'auto auto auto',
            'gridTemplateAreas': ` 
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
            onClick={async (e) => {
              e.stopPropagation()
              await copyContent(p.name)
            }}
          >
            <RippleText text={getHighlightedText(p['name'], search)} />
          </Box>

          <Chip
            sx={{ gridArea: 'sku', justifySelf: 'flex-start' }}
            label={getHighlightedText(p['sku'], search)}
            size="small"
            onClick={async (e) => {
              e.stopPropagation()
              await copyContent(p.sku)
            }}
          />

          <Box
            sx={{
              gridArea: 'meta',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <PriceChip product={p} />
            <VendorChip vendor={p.vendor} />

            {p.pics && (
              <ImageIcon color="secondary" fontSize="small" data-no-export />
            )}
            {p.link && (
              <LinkIcon color="secondary" fontSize="small" data-no-export />
            )}

            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="small"
                sx={{
                  pt: 0,
                  pb: 0,
                  color: isFav ? 'warning.light' : 'secondary.light',
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  toggle()
                }}
              >
                {isFav ? (
                  <StarIcon data-no-export />
                ) : (
                  <StarBorderIcon data-no-export />
                )}
              </IconButton>

              <HiddenInput>
                <Stock stock={p.stock} bordered />
              </HiddenInput>
            </Box>
          </Box>
        </Card>
      </>
    )
  },
  (p1, p2) => {
    return p1.isFav === p2.isFav && p1.search === p2.search
  },
)

export const TilesView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  const favs = useFavsItems()
  const { toggle } = useFavsActions()

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
            toggle={() => toggle(favId)}
          />
        )
      })}
    </Stack>
  )
}
