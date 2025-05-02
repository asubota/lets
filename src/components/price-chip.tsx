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
  const hasSale =
    !!product.price_old && Number(product.price_old) !== product.price

  const discount = product.price_old
    ? ((1 - product.price / product.price_old) * 100).toFixed(0)
    : 0
  const diff = product.price_old ? product.price_old - product.price : 0

  const getLabel = (key: PriceKey) => {
    switch (key) {
      case 'price':
        return `${product.price} грн`
      case 'p2':
        return `${product.p2 || '?'} грн`
      case 'price_old':
        return (
          <>
            {product.price_old} грн
            <Box
              component="span"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'white' : 'black',
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
      variant="outlined"
      sx={{
        borderWidth: '2px',
        borderColor: 'secondary.main',

        ...(key === '-' && {
          color: 'success.main',
          fontWeight: 'bold',
        }),

        ...(key === 'p2' && {
          color: 'info.main',
          fontStyle: 'italic',
        }),

        ...(key === 'price_old' && {
          color: 'secondary.light',
        }),

        ...(hasSale && {
          borderColor: 'primary.main',
        }),
      }}
      {...props}
    />
  )
}
