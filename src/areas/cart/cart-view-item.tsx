import { FC } from 'react'
import { Box, Card, Divider, IconButton } from '@mui/material'
import { CartItem, Product } from '../../types.ts'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useSetPropOnCart } from '../../cart-api.ts'
import { Discount } from './discount.tsx'
import { DiscountInput } from './discount-input.tsx'

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
        <Box sx={{ pt: '4px', pb: '4px' }}>
          Ціна:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {fullPrice}
          </Box>{' '}
          грн
        </Box>
      )}

      {priceWithDiscount !== fullPrice && (
        <Box
          sx={{ pt: '4px', pb: '4px', display: 'flex', alignItems: 'center' }}
        >
          Ціна:
          <Box
            component="span"
            sx={{ ml: '4px', fontSize: '14px', position: 'relative' }}
          >
            {fullPrice} грн
            <Box
              sx={{
                position: 'absolute',
                backgroundColor: 'red',
                width: 'calc(100% + -10px)',
                height: '2px',
                transform: 'rotate(-18deg)',
                left: '-8px',
                bottom: '11px',
                borderRadius: '2px',
              }}
            />
          </Box>
          <Box
            component="span"
            sx={{ fontWeight: 'bold', color: 'success.main', ml: '4px' }}
          >
            {priceWithDiscount.toFixed(2)} грн
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
            {Math.ceil((fullPrice * discount) / 100)} грн
          </Box>
        </Box>
      )}

      <Box
        sx={{
          pt: '4px',
          pb: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Discount
          key={`${item.itemId}:${discount}:left`}
          discount={discount}
          itemId={item.itemId}
          fullPrice={fullPrice}
        />
        <DiscountInput
          key={`${item.itemId}:${discount}:right`}
          discount={discount}
          itemId={item.itemId}
        />
      </Box>

      <Box
        sx={{
          pt: '4px',
          pb: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>Кількість: {item.quantity} шт</Box>
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
    </Card>
  )
}
