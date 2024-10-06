import { FC, memo, MouseEventHandler, useState } from 'react'
import { Product } from '../types.ts'
import { DetailsPopup } from './details-popup.tsx'
import { Box, Card, Chip, IconButton } from '@mui/material'
import { copyContent, getFavoriteId, getHighlightedText } from '../tools.tsx'
import { RippleText } from './ripple-text.tsx'
import { PriceChip } from './price-chip.tsx'
import { VendorChip } from './vendor-chip.tsx'
import ImageIcon from '@mui/icons-material/Image'
import LinkIcon from '@mui/icons-material/Link'
import { HiddenInput } from './hidden-input.tsx'
import { Stock } from './stock.tsx'
import SettingsIcon from '@mui/icons-material/Settings'
import { TileSettings } from './tile-settings.tsx'
import { FavoritesButton } from './favorites-button.tsx'
import { NotesButton } from './notes-button.tsx'

export const Tile: FC<{
  p: Product
  search: string
  isFavorite: boolean
  iFavouriteRoute: boolean
  isChanged: boolean
}> = memo(
  ({ p, search, isFavorite, iFavouriteRoute, isChanged }) => {
    const [details, setDetails] = useState<Product | null>(null)
    const [showSettings, setShowSettings] = useState(false)

    const handleCardClick = () => {
      if (showSettings) {
        return
      }

      if (p.link || p.pics) {
        setDetails(p)
      }
    }

    const handleToggleSettings: MouseEventHandler = (e) => {
      e.stopPropagation()
      setShowSettings((value) => !value)
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
            'position': 'relative',
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
          {iFavouriteRoute && (
            <IconButton
              size="small"
              sx={{
                color: 'secondary.main',
                position: 'absolute',
                top: '0',
                right: '0',
                zIndex: 10,
              }}
              data-no-export
              onClick={handleToggleSettings}
            >
              <SettingsIcon
                sx={{ color: isChanged ? 'primary.dark' : 'text.secondary' }}
                fontSize="small"
              />
            </IconButton>
          )}

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
          {showSettings && (
            <Box
              sx={{
                gridArea: 'meta',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <TileSettings favoriteId={getFavoriteId(p)} />
            </Box>
          )}

          {!showSettings && (
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
                <LinkIcon
                  color="secondary"
                  data-no-export
                  sx={{
                    fontSize: 'small',
                  }}
                />
              )}

              <Box
                sx={{
                  ml: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {iFavouriteRoute && (
                  <NotesButton favoriteId={getFavoriteId(p)} />
                )}
                <FavoritesButton
                  isFavorite={isFavorite}
                  favoriteId={getFavoriteId(p)}
                />
                <HiddenInput>
                  <Stock stock={p.stock} bordered />
                </HiddenInput>
              </Box>
            </Box>
          )}
        </Card>
      </>
    )
  },
  (p1, p2) => {
    return (
      p1.isFavorite === p2.isFavorite &&
      p1.search === p2.search &&
      p1.isChanged === p2.isChanged &&
      p1.iFavouriteRoute === p2.iFavouriteRoute
    )
  },
)