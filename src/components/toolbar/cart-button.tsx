import { type FC } from 'react'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, IconButton } from '@mui/material'
import { createLink } from '@tanstack/react-router'

import { useCartItemsCount } from '../../hooks/use-cart-items-count.ts'

const LinkedIconButton = createLink(IconButton)

export const CartButton: FC<{ search: string }> = ({ search }) => {
  const count = useCartItemsCount()

  return (
    <LinkedIconButton
      size="small"
      sx={{ color: 'text.secondary', mr: '14px' }}
      to="/cart"
      search={{ s: search }}
    >
      <ShoppingCartIcon />

      <Box
        component="span"
        sx={{
          color: 'red',
          fontSize: '12px',
          position: 'absolute',
          right: '-5px',
          top: '-2px',
        }}
      >
        {count}
      </Box>
    </LinkedIconButton>
  )
}
