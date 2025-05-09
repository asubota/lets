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
            icon: false,
            theme: 'colored',
          })
        },
      },
    )
  }

  return (
    <IconButton
      data-no-export
      sx={{
        ml: 'auto',
        color: cartItemsIds.includes(itemId)
          ? 'primary.main'
          : 'secondary.main',
      }}
      onClick={() => handleBasket()}
    >
      <AddShoppingCartIcon sx={{ fontSize: '14px' }} />
    </IconButton>
  )
}
