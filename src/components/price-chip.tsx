import { type FC, useState } from 'react'

import { Chip, Box } from '@mui/material'

import { type Product } from '../types.ts'

type PriceKey = '-' | 'p2' | 'price' | 'price_old'

const getNextKey = (key: PriceKey, hasSale: boolean): PriceKey => {
  if (hasSale) {
    switch (key) {
      case 'price':
        return 'price_old'
      case 'price_old':
        return 'p2'
      case 'p2':
        return '-'
      case '-':
        return 'price'
    }
  } else {
    switch (key) {
      case 'price':
        return 'p2'
      case 'p2':
        return '-'
      case '-':
        return 'price'
    }
  }

  return 'price'
}

export const PriceChip: FC<{ product: Product }> = ({ product }) => {
  const [key, setKey] = useState<PriceKey>('price')
  const hasSale = !!product.price_old && Number(product.price_old) !== product.price

  const discount = product.price_old ? ((1 - product.price / product.price_old) * 100).toFixed(0) : 0
  const diff = product.price_old ? product.price_old - product.price : 0

  const getLabel = (key: PriceKey) => {
    switch (key) {
      case 'price':
        return `${product.price.toLocaleString()} грн`
      case 'p2':
        return `${product.p2 || '?'} грн`
      case 'price_old':
        return (
          <>
            {product.price_old} грн
            <Box
              component="span"
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'),
                fontSize: '12px',
              }}
            >
              {' '}
              - {discount}% = {diff} грн
            </Box>
          </>
        )
      case '-':
        return product.p2 ? `+${product.price - product.p2} грн` : '? грн'
    }
  }

  const rotateDisplayedPrice = () => {
    setKey((prev) => getNextKey(prev, hasSale))
  }

  const props: Record<string, unknown> = {}
  if (['earn', 'base-price'].includes(key)) {
    props['data-no-export'] = true
  }

  return (
    <Chip
      onClick={(e) => {
        e.stopPropagation()
        rotateDisplayedPrice()
      }}
      label={getLabel(key)}
      size="small"
      sx={{
        'fontFamily': '"Outfit", sans-serif',
        'fontWeight': 700,
        'fontSize': '14px',
        'height': '28px',
        'backgroundColor': (theme) =>
          hasSale
            ? 'rgba(234, 43, 6, 0.1)'
            : theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0,0,0,0.04)',
        'color': hasSale ? 'primary.main' : 'text.primary',
        'border': hasSale ? '1px solid' : 'none',
        'borderColor': 'primary.main',
        'borderRadius': '10px',
        '& .MuiChip-label': { px: 1.5 },

        ...(key === '-' && {
          color: (theme) => (theme.palette.mode === 'dark' ? '#66bb6a' : 'success.dark'),
          backgroundColor: 'rgba(102, 187, 106, 0.1)',
        }),

        ...(key === 'p2' && {
          color: 'info.main',
          backgroundColor: 'rgba(3, 169, 244, 0.1)',
        }),

        ...(key === 'price_old' && {
          color: 'text.secondary',
          fontSize: '12px',
        }),
      }}
      {...props}
    />
  )
}
