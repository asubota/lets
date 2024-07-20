import { FC, useState } from 'react'
import { Chip } from '@mui/material'
import { Product } from '../types.ts'

export const PriceChip: FC<{ product: Product }> = ({ product }) => {
  const [key, setKey] = useState<'price' | 'p2'>('price')

  const label = {
    price: `${product[key]} uah`,
    p2: `+${product.p2 ? product.price - product.p2 : '?'} uah`,
  }

  const props: Record<string, unknown> = {}
  if (key === 'p2') {
    props['data-no-export'] = true
  }

  return (
    <Chip
      onClick={(e) => {
        e.stopPropagation()
        setKey((val) => (val === 'p2' ? 'price' : 'p2'))
      }}
      label={label[key]}
      size="small"
      variant="outlined"
      sx={{
        borderWidth: '2px',
        borderColor: 'secondary.main',
        ...(key === 'p2' && {
          color: 'success.main',
          fontWeight: 'bold',
        }),
      }}
      {...props}
    />
  )
}
