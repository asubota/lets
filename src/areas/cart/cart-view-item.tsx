import { FC } from 'react'
import { Box, Card, Divider, IconButton } from '@mui/material'
import { CartItem, Product } from '../../types.ts'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useSetPropOnCart } from '../../cart-api.ts'

interface CartItemViewProps {
  item: CartItem & { product?: Product }
}

export const CartItemView: FC<CartItemViewProps> = ({ item }) => {
  const discount = parseInt(item.discount, 10)
  const quantity = parseInt(item.quantity, 10)
  const fullPrice = item.product?.price || 0
  const priceWithDiscount = fullPrice - (fullPrice * discount) / 100
  const { mutate } = useSetPropOnCart()

  return (
    <Card variant="elevation" sx={{ p: 1 }}>
      <Box sx={{ mb: 2 }}> {item.product?.name}</Box>
      <Divider />

      {priceWithDiscount === fullPrice && (
        <Box sx={{ pt: 1, pb: 1 }}>
          ціна:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {item.product?.price}
          </Box>{' '}
          грн
        </Box>
      )}

      {priceWithDiscount !== fullPrice && (
        <Box sx={{ pt: 1, pb: 1, display: 'flex', alignItems: 'center' }}>
          ціна:
          <Box
            component="span"
            sx={{ fontWeight: 'bold', ml: '2px', mr: '2px' }}
          >
            {priceWithDiscount}
          </Box>
          грн{' '}
          <Box
            component="span"
            sx={{
              textDecoration: 'line-through',
              fontSize: '13px',
              alignSelf: 'flex-end',
              ml: '6px',
            }}
          >
            {fullPrice} грн
          </Box>
          <Box
            component="span"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              fontSize: '15px',
              ml: 'auto',
            }}
          >
            {((fullPrice * discount) / 100).toFixed(2)} грн
          </Box>
        </Box>
      )}

      <Box
        sx={{
          pt: 1,
          pb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>кількість: {item.quantity}</Box>
        <Box>
          <IconButton
            size="small"
            color="secondary"
            disabled={quantity === 1}
            onClick={() =>
              mutate({
                itemId: item.itemId,
                quantity: String(quantity - 1),
              })
            }
          >
            <RemoveIcon />
          </IconButton>
          <IconButton
            size="small"
            color="secondary"
            onClick={() =>
              mutate({
                itemId: item.itemId,
                quantity: String(quantity + 1),
              })
            }
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          pt: 1,
          pb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>знижка: {discount}</Box>
        <Box>
          <IconButton
            size="small"
            color="secondary"
            disabled={discount === 0}
            onClick={() =>
              mutate({
                itemId: item.itemId,
                discount: String(discount - 1),
              })
            }
          >
            <RemoveIcon />
          </IconButton>
          <IconButton
            size="small"
            color="secondary"
            onClick={() =>
              mutate({
                itemId: item.itemId,
                discount: String(discount + 1),
              })
            }
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}
