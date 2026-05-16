import { type FC } from 'react'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { IconButton } from '@mui/material'
import { toast } from 'react-toastify'

import { useToggleInCart } from '../cart-api.ts'
import { useCartItemsIds } from '../hooks/use-cart-items-ids.ts'

interface AddToCartButtonProps {
  itemId: string
  name: string
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({ itemId, name }) => {
  const cartItemsIds = useCartItemsIds()
  const { mutate } = useToggleInCart()

  const handleBasket = () => {
    mutate(
      { itemId, action: 'add' },
      {
        onSuccess() {
          toast.success(`${name} додано в корзину!`, {
            position: 'bottom-center',
            hideProgressBar: true,
            autoClose: 2500,
            icon: () => <AddShoppingCartIcon style={{ fontSize: '18px', color: '#4ade80' }} />,
            className: 'cart-toast',
          })
        },
      },
    )
  }

  const inCart = cartItemsIds.includes(itemId)

  return (
    <IconButton
      data-no-export
      sx={{
        'ml': 'auto',
        'color': inCart ? 'primary.main' : 'text.secondary',
        'backgroundColor': (theme) =>
          inCart
            ? theme.palette.mode === 'dark'
              ? 'rgba(234,43,6,0.12)'
              : 'rgba(234,43,6,0.08)'
            : theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.04)',
        'border': (theme) =>
          inCart
            ? '1px solid rgba(234,43,6,0.2)'
            : theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.07)'
              : '1px solid rgba(0,0,0,0.07)',
        'borderRadius': '9px',
        'p': 0.75,
        '&:hover': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(234,43,6,0.2)'
              : 'rgba(234,43,6,0.12)',
          color: 'primary.main',
        },
      }}
      onClick={() => handleBasket()}
    >
      <AddShoppingCartIcon sx={{ fontSize: '14px' }} />
    </IconButton>
  )
}
