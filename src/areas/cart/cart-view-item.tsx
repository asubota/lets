import { type FC } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Card, Divider, IconButton, Typography } from '@mui/material'

import { DiscountInput } from './discount-input.tsx'
import { Discount } from './discount.tsx'
import { useSetPropOnCart } from '../../cart-api.ts'
import { type CartItem, type Product } from '../../types.ts'

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
    <Card 
      sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1.5,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.palette.mode === 'dark' 
            ? '0 12px 32px rgba(0,0,0,0.5)' 
            : '0 8px 24px rgba(15, 23, 42, 0.06)',
        }
      }}
    >
      <Box 
        sx={{ 
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 700,
          fontSize: '15px',
          color: 'text.primary',
          letterSpacing: '-0.2px',
          mb: 0.5
        }}
      >
        {item.product?.name}
      </Box>
      <Divider sx={{ opacity: 0.6 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: '"Outfit", sans-serif', 
            fontWeight: 600, 
            color: 'text.secondary' 
          }}
        >
          Ціна:
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {priceWithDiscount !== fullPrice && (
            <Box
              component="span"
              sx={{ 
                fontSize: '13px', 
                color: 'text.disabled',
                textDecoration: 'line-through',
                fontWeight: 500,
                fontFamily: '"Outfit", sans-serif'
              }}
            >
              {fullPrice} грн
            </Box>
          )}
          <Box
            component="span"
            sx={{ 
              fontWeight: 800, 
              color: priceWithDiscount !== fullPrice ? 'primary.main' : 'text.primary',
              fontFamily: '"Outfit", sans-serif',
              fontSize: '16px'
            }}
          >
            {priceWithDiscount.toFixed(2)} грн
          </Box>
          {priceWithDiscount !== fullPrice && (
            <Box
              component="span"
              sx={{
                fontWeight: 900,
                color: 'primary.main',
                fontSize: '12px',
                backgroundColor: 'rgba(234, 43, 6, 0.1)',
                px: 0.75,
                py: 0.25,
                borderRadius: '6px',
                ml: 0.5
              }}
            >
              -{discount}%
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          p: 1.5,
          borderRadius: '12px',
          gap: 2
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 0.5
        }}
      >
        <Box 
          sx={{ 
            fontFamily: '"Outfit", sans-serif', 
            fontWeight: 700, 
            color: 'text.secondary',
            fontSize: '14px'
          }}
        >
          Кількість: {item.quantity} шт
        </Box>
        <Box data-no-export sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            sx={{ 
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              borderRadius: '10px'
            }}
            disabled={quantity === 1}
            onClick={() =>
              mutate({
                itemId: item.itemId,
                quantity: String(quantity - 1),
              })
            }
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ 
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              borderRadius: '10px'
            }}
            onClick={() =>
              mutate({
                itemId: item.itemId,
                quantity: String(quantity + 1),
              })
            }
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}
