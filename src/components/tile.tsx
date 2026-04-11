import { type FC, type MouseEventHandler, useState } from 'react'

import ImageIcon from '@mui/icons-material/Image'
import PercentIcon from '@mui/icons-material/Percent'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Card, Chip, IconButton, Typography } from '@mui/material'
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
        'p': 2,
        'borderRadius': '24px',
        'position': 'relative',
        'display': 'flex',
        'flexDirection': 'column',
        'gap': '12px',
        'transition': 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:active': {
          transform: 'scale(0.98)',
        },
        'boxShadow': (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 4px 20px rgba(0,0,0,0.03)',
        'border': '1px solid',
        'borderColor': (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(0,0,0,0.05)',
      }}
    >
      {isFavorite && (
        <IconButton
          size="small"
          sx={{
            'color': 'secondary.main',
            'position': 'absolute',
            'top': '8px',
            'right': '8px',
            'zIndex': 10,
            'backgroundColor': (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.03)',
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.06)',
            },
          }}
          data-no-export
          onClick={handleToggleSettings}
        >
          <SettingsIcon
            sx={{
              color: isChanged ? 'primary.main' : 'text.secondary',
              fontSize: '18px',
            }}
          />
        </IconButton>
      )}

      <Box
        sx={{
          textAlign: 'left',
          wordBreak: 'break-word',
          cursor: 'pointer',
        }}
        onClick={() => copyContent(p.name)}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '15px',
            lineHeight: 1.3,
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          <RippleText text={getHighlightedText(p['name'], search)} />
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={getHighlightedText(p['sku'], search)}
            size="small"
            onClick={() => copyContent(p.sku)}
            sx={{
              'fontFamily': '"Inter", sans-serif',
              'fontSize': '10px',
              'fontWeight': 700,
              'backgroundColor': (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.04)',
              'borderRadius': '8px',
              '& .MuiChip-label': { px: 1 },
            }}
          />
          {!isFavoritePage && (
            <LinkedButton
              to="/list/$id/percents"
              params={{ id: getFavoriteId(p) }}
              size="small"
              sx={{
                'color': 'text.secondary',
                'backgroundColor': (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.04)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.08)',
                },
                'p': 0.5,
              }}
              data-no-export
            >
              <PercentIcon sx={{ fontSize: '16px' }} />
            </LinkedButton>
          )}
        </Box>

        {!isFavoritePage && (
          <AddToCartButton itemId={getFavoriteId(p)} name={p.name} />
        )}
      </Box>

      {showSettings && <TileSettings favoriteId={getFavoriteId(p)} />}

      {!showSettings && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 0.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PriceChip product={p} />
            <VendorChip vendor={p.vendor} />
            {p.pics && (
              <LinkedIcon
                to={
                  isFavoritePage
                    ? `/favorites/$id/details`
                    : `/list/$id/details`
                }
                params={{ id: getFavoriteId(p) }}
                sx={{
                  'color': 'text.secondary',
                  'fontSize': '20px',
                  'cursor': 'pointer',
                  'ml': 0.5,
                  'opacity': 0.7,
                  '&:hover': { opacity: 1 },
                }}
                data-no-export
              />
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
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
