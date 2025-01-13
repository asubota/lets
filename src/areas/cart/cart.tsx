import { Box, Button, Container, Divider, IconButton } from '@mui/material'
import { FC } from 'react'
import { SwipeItem } from './swipeable-item.tsx'
import { createLink } from '@tanstack/react-router'
import DeleteIcon from '@mui/icons-material/Delete'
import { CartItemView } from './cart-view-item.tsx'
import { useAllData, useIsLoading } from '../../use-data.ts'
import { findProduct } from '../../tools.tsx'
import HouseIcon from '@mui/icons-material/House'
import { useGetCart, useToggleInCart } from '../../cart-api.ts'
import { EmptyCart } from './empty-cart.tsx'
import { LoadingCart } from './loading-cart.tsx'

const LinkedButton = createLink(Button)

export const Cart: FC = () => {
  const { mutate } = useToggleInCart()
  const loading = useIsLoading()
  const data = useAllData()
  const { data: cartItems = [], isLoading } = useGetCart()

  const fullData = cartItems.map((item) => {
    return { ...item, product: findProduct(item.itemId, data) }
  })

  const fullPrice = fullData
    .reduce((acc, item) => {
      const price = item.product?.price || 0
      const quantity = parseInt(item.quantity, 10)

      return acc + price * quantity
    }, 0)
    .toFixed(2)

  const discountPrice = fullData
    .reduce((acc, item) => {
      const price = item.product?.price || 0
      const quantity = parseInt(item.quantity, 10)
      const discount = parseInt(item.discount, 10)
      const discountedPrice = price - (price * discount) / 100

      return acc + discountedPrice * quantity
    }, 0)
    .toFixed(2)

  const totalDiscount = fullData.reduce((acc, item) => {
    const price = item.product?.price || 0
    const quantity = parseInt(item.quantity, 10)
    const discount = parseInt(item.discount, 10)
    const discountPrice = (price * discount) / 100

    return acc + discountPrice * quantity
  }, 0)

  if (isLoading || loading) {
    return <LoadingCart />
  }

  if (!isLoading && cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <>
      <Container sx={{ p: 3, maxWidth: '700px', margin: 'auto' }}>
        {fullData.map((item) => {
          return (
            <SwipeItem
              key={item.itemId}
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
        })}
        <Divider />
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          {totalDiscount > 0 && (
            <>
              <Box>Разом: {fullPrice} грн</Box>
              <Box>
                Знижка:{' '}
                <Box
                  sx={{ fontWeight: 'bold', color: 'primary.main' }}
                  component="span"
                >
                  {totalDiscount.toFixed(2)} грн
                </Box>
              </Box>
            </>
          )}

          <Box>До оплати: {discountPrice} грн</Box>
        </Box>
      </Container>

      <Box sx={{ p: 3, maxWidth: '700px', margin: 'auto' }}>
        <LinkedButton to="/list" fullWidth variant="contained">
          <HouseIcon color="secondary" />
        </LinkedButton>
      </Box>
    </>
  )
}
