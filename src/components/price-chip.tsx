import { FC, useState } from 'react'
import { Chip } from '@mui/material'
import { Product } from '../types.ts'

type PriceKey = 'earn' | 'base-price' | 'full-price'

export const PriceChip: FC<{ product: Product }> = ({ product }) => {
  const [key, setKey] = useState<PriceKey>('full-price')

  const label: Record<PriceKey, string> = {
    'full-price': `${product.price} грн`,
    'base-price': `${product.p2 || '?'} грн`,
    'earn': `+${product.p2 ? product.price - product.p2 : '?'} грн`,
  }

  const props: Record<string, unknown> = {}
  if (['earn', 'base-price'].includes(key)) {
    props['data-no-export'] = true
  }

  const rotateDisplayedPrice = () => {
    const map: Record<PriceKey, PriceKey> = {
      'full-price': 'base-price',
      'base-price': 'earn',
      'earn': 'full-price',
    }

    setKey((value) => map[value])
  }

  return (
    <Chip
      onClick={(e) => {
        e.stopPropagation()
        rotateDisplayedPrice()
      }}
      label={label[key]}
      size="small"
      variant="outlined"
      sx={{
        borderWidth: '2px',
        borderColor: 'secondary.main',

        ...(key === 'earn' && {
          color: 'success.main',
          fontWeight: 'bold',
        }),

        ...(key === 'base-price' && {
          color: 'info.main',
          fontStyle: 'italic',
        }),
      }}
      {...props}
    />
  )
}
