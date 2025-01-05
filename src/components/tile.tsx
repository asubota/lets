import { FC, MouseEventHandler, useState } from 'react'
import { FavoriteProduct, Product } from '../types.ts'
import { Box, Card, Chip, IconButton } from '@mui/material'
import { copyContent, getFavoriteId, getHighlightedText } from '../tools.tsx'
import { RippleText } from './ripple-text.tsx'
import { PriceChip } from './price-chip.tsx'
import { VendorChip } from './vendor-chip.tsx'
import ImageIcon from '@mui/icons-material/Image'
import { HiddenInput } from './hidden-input.tsx'
import { Stock } from './stock.tsx'
import SettingsIcon from '@mui/icons-material/Settings'
import PercentIcon from '@mui/icons-material/Percent'
import { TileSettings } from './tile-settings.tsx'
import { FavoritesButton } from './favorites-button.tsx'
import { NotesButton } from './notes-button.tsx'
import { FavoriteTime } from './favorite-time.tsx'
import { createLink } from '@tanstack/react-router'

const LinkedButton = createLink(IconButton)
const LinkedIcon = createLink(ImageIcon)

export const Tile: FC<{
  p: Product | FavoriteProduct
  search: string
  isFavorite: boolean
  iFavouriteRoute: boolean
  isChanged: boolean
}> = ({ p, search, isFavorite, iFavouriteRoute, isChanged }) => {
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
        ...('missed' in p &&
          p.missed && {
            backgroundColor: '#ea2b060f',
          }),
        'p': 1,
        'pb': '2px',
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
        onClick={async () => await copyContent(p.name)}
      >
        <RippleText text={getHighlightedText(p['name'], search)} />
      </Box>

      <Box sx={{ gridArea: 'sku', justifySelf: 'flex-start' }}>
        <Chip
          label={getHighlightedText(p['sku'], search)}
          size="small"
          onClick={async () => await copyContent(p.sku)}
        />
        {!iFavouriteRoute && (
          <LinkedButton
            to="/list/$id/percents"
            params={{ id: getFavoriteId(p) }}
            data-no-export
          >
            <PercentIcon sx={{ fontSize: 'small' }} />
          </LinkedButton>
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
              to="/list/$id/details"
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
            {iFavouriteRoute && <NotesButton favoriteId={getFavoriteId(p)} />}
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
