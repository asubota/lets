import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { CartItemView } from './cart-view-item.tsx'
import { SwipeItem } from './swipeable-item.tsx'
import { type CartItem } from '../../types.ts'
import { useToggleInCart } from '../../cart-api.ts'

interface CartItemProps {
  item: CartItem
}

export const CartItemRow = ({ item }: CartItemProps) => {
  const { mutate } = useToggleInCart()

  return (
    <SwipeItem
      actions={
        <IconButton
          onClick={() => {
            mutate({ itemId: item.itemId, action: 'remove' })
          }}
          sx={{
            backgroundColor: 'red',
            borderRadius: 0,
            width: '100%',
            minWidth: '80px',
            height: '100%',
          }}
        >
          <DeleteIcon sx={{ color: 'white' }} />
        </IconButton>
      }
    >
      <CartItemView item={item} />
    </SwipeItem>
  )
}
