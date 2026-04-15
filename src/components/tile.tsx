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
      sx={(theme) => ({
        ...('missed' in p && p.missed && { backgroundColor: theme.palette.mode === 'dark' ? 'rgba(234, 43, 6, 0.08)' : 'rgba(234, 43, 6, 0.04)' }),
        'p': 2.5,
        'position': 'relative',
        'display': 'flex',
        'flexDirection': 'column',
        'gap': '16px',
        'cursor': 'default',
        'height': '100%',
        '&:hover': {
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)' 
            : '0 12px 32px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5)',
        },
      })}
    >
      {isFavorite && (
        <IconButton
          size="small"
          sx={{
            'color': 'secondary.main',
            'position': 'absolute',
            'top': '12px',
            'right': '12px',
            'zIndex': 10,
            'backgroundColor': (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.03)',
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.12)'
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
            fontSize: '16px',
            lineHeight: 1.4,
            color: 'text.primary',
            fontWeight: 700,
            letterSpacing: '-0.2px',
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
          mt: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={getHighlightedText(p['sku'], search)}
            size="small"
            onClick={() => copyContent(p.sku)}
            sx={{
              'fontFamily': '"Outfit", sans-serif',
              'fontSize': '11px',
              'fontWeight': 800,
              'backgroundColor': (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.05)',
              'color': 'text.secondary',
              'borderRadius': '8px',
              '& .MuiChip-label': { px: 1.2 },
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
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(0,0,0,0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.08)',
                  color: 'primary.main',
                },
                'p': 0.75,
              }}
              data-no-export
            >
              <PercentIcon sx={{ fontSize: '18px' }} />
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
            pt: 1,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                  'fontSize': '22px',
                  'cursor': 'pointer',
                  'opacity': 0.6,
                  'transition': 'all 0.2s',
                  '&:hover': { 
                    opacity: 1,
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                }}
                data-no-export
              />
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
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
