import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { IconButton } from '@mui/material'
import { FC } from 'react'
import { createLink } from '@tanstack/react-router'

const LinkedIconButton = createLink(IconButton)

export const CartButton: FC = () => {
  return (
    <LinkedIconButton
      size="small"
      sx={{ color: 'text.secondary', mr: '14px' }}
      to="/cart"
    >
      <ShoppingCartIcon />
    </LinkedIconButton>
  )
}
