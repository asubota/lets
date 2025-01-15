import { Button, Container, Divider, IconButton } from '@mui/material'
import { FC } from 'react'
import { SwipeItem } from './swipeable-item.tsx'
import { createLink, useSearch } from '@tanstack/react-router'
import DeleteIcon from '@mui/icons-material/Delete'
import { CartItemView } from './cart-view-item.tsx'
import { useAllData, useIsLoading } from '../../use-data.ts'
import { findProduct } from '../../tools.tsx'
import HouseIcon from '@mui/icons-material/House'
import { useGetCart, useToggleInCart } from '../../cart-api.ts'
import { EmptyCart } from './empty-cart.tsx'
import { LoadingCart } from './loading-cart.tsx'
import { PriceSummary } from './price-summary.tsx'

const LinkedButton = createLink(Button)

export const Cart: FC = () => {
  const { s } = useSearch({ from: '/cart' })

  const { mutate } = useToggleInCart()
  const loading = useIsLoading()
  const data = useAllData()
  const { data: cartItems = [], isLoading } = useGetCart()

  const fullData = cartItems.map((item) => {
    return { ...item, product: findProduct(item.itemId, data) }
  })

  const fullPrice = fullData.reduce((acc, item) => {
    const price = item.product?.price || 0
    const quantity = parseInt(item.quantity, 10)

    return acc + price * quantity
  }, 0)

  const discountPrice = fullData.reduce((acc, item) => {
    const price = item.product?.price || 0
    const quantity = parseInt(item.quantity, 10)
    const discount = parseInt(item.discount, 10)
    const discountedPrice = price - Math.ceil((price * discount) / 100)

    return acc + discountedPrice * quantity
  }, 0)

  const totalDiscount = fullData.reduce((acc, item) => {
    const price = item.product?.price || 0
    const quantity = parseInt(item.quantity, 10)
    const discount = parseInt(item.discount, 10)
    const discountPrice = Math.ceil((price * discount) / 100)

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
      <Container maxWidth="md" sx={{ pt: 2, position: 'relative' }}>
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
        <PriceSummary
          fullPrice={fullPrice}
          discountPrice={discountPrice}
          totalDiscount={totalDiscount}
        />
      </Container>

      <Container maxWidth="md" sx={{ pt: 2, pb: 2 }}>
        <LinkedButton to="/list" fullWidth variant="contained" search={{ s }}>
          <HouseIcon color="secondary" />
        </LinkedButton>
      </Container>
    </>
  )
}
