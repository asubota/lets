import { type FC, type MouseEventHandler, useState } from 'react'

import ImageIcon from '@mui/icons-material/Image'
import PercentIcon from '@mui/icons-material/Percent'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Card, Chip, IconButton } from '@mui/material'
import { createLink } from '@tanstack/react-router'

import { copyContent, getFavoriteId, getHighlightedText } from '../tools.tsx'
import { FavoriteTime } from './favorite-time.tsx'
import { FavoritesButton } from './favorites-button.tsx'
import { HiddenInput } from './hidden-input.tsx'
import { NotesButton } from './notes-button.tsx'
import { PriceChip } from './price-chip.tsx'
import { RippleText } from './ripple-text.tsx'
import { Stock } from './stock.tsx'
import { TileSettings } from './tile-settings.tsx'
import { VendorChip } from './vendor-chip.tsx'
import { type FavoriteProduct, type Product } from '../types.ts'
import { AddToCartButton } from './tile-add-to-cart.tsx'

const LinkedButton = createLink(IconButton)
const LinkedIcon = createLink(ImageIcon)

export const Tile: FC<{
  p: Product | FavoriteProduct
  search: string
  isFavorite: boolean
  isFavoritePage: boolean
  isChanged: boolean
}> = ({ p, search, isFavorite, isFavoritePage, isChanged }) => {
  const [showSettings, setShowSettings] = useState(false)

  const handleToggleSettings: MouseEventHandler = (e) => {
    e.stopPropagation()
    setShowSettings((value) => !value)
  }

  return (
    <Card
      className="product-tile"
      variant="outlined"
      sx={{
        ...('missed' in p && p.missed && { backgroundColor: '#ea2b060f' }),
        'p': 1,
        'pb': '2px',
        'position': 'relative',
        'display': 'grid',
        'rowGap': '12px',
        'columnGap': '4px',
        '&:has(input:checked)': { borderColor: 'text.secondary' },
        'gridTemplateColumns': '1fr',
        'gridTemplateRows': 'auto auto auto',
        'gridTemplateAreas': ` 
        "name"
        "sku"
        "meta"
      `,
      }}
    >
      {isFavorite && (
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
        onClick={() => copyContent(p.name)}
      >
        <RippleText text={getHighlightedText(p['name'], search)} />
      </Box>

      <Box
        sx={{
          gridArea: 'sku',
          justifySelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Chip
          label={getHighlightedText(p['sku'], search)}
          size="small"
          onClick={() => copyContent(p.sku)}
        />
        {!isFavoritePage && (
          <>
            <LinkedButton
              to="/list/$id/percents"
              params={{ id: getFavoriteId(p) }}
              data-no-export
            >
              <PercentIcon sx={{ fontSize: 'small' }} />
            </LinkedButton>

            <AddToCartButton itemId={getFavoriteId(p)} name={p.name} />
          </>
        )}
      </Box>
      {showSettings && <TileSettings favoriteId={getFavoriteId(p)} />}

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
            <LinkedIcon
              to={
                isFavoritePage ? `/favorites/$id/details` : `/list/$id/details`
              }
              params={{ id: getFavoriteId(p) }}
              sx={{
                color: 'secondary',
                fontSize: 'small',
                cursor: 'pointer',
              }}
              data-no-export
            />
          )}

          <Box
            sx={{
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isFavorite && 'time' in p && <FavoriteTime time={p.time} />}
            {isFavoritePage && <NotesButton favoriteId={getFavoriteId(p)} />}
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
  )
}
