import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
} from '@mui/material'
import { FC } from 'react'
import { SwipeItem } from './swipeable-item.tsx'
import { createLink, Outlet, useSearch } from '@tanstack/react-router'
import DeleteIcon from '@mui/icons-material/Delete'
import { CartItemView } from './cart-view-item.tsx'
import { useAllData, useIsLoading } from '../../use-data.ts'
import { findProduct } from '../../tools.tsx'
import HouseIcon from '@mui/icons-material/House'
import { useGetCart, useToggleInCart } from '../../cart-api.ts'
import { EmptyCart } from './empty-cart.tsx'
import { LoadingCart } from './loading-cart.tsx'
import { PriceSummary } from './price-summary.tsx'
import { CartItem, Product } from '../../types.ts'
import { FloatingActions } from './floating-actions.tsx'
import { useMediaQuery } from '../../hooks/use-media-query.ts'

const LinkedButton = createLink(Button)

const priceSortFn = (
  a: CartItem & { product?: Product },
  b: CartItem & { product?: Product },
) => {
  const aPrice =
    (a.product?.price || 0) *
    Number(a.quantity) *
    (1 - Number(a.discount) / 100)
  const bPrice =
    (b.product?.price || 0) *
    Number(b.quantity) *
    (1 - Number(b.discount) / 100)

  return bPrice - aPrice
}

const w = '190px'

export const Cart: FC = () => {
  const wideScreen = useMediaQuery('(min-width: 1340px)')
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
      <Outlet />

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 2,
          pb: 2,
          pl: 0,
          pr: 0,
        }}
        maxWidth={false}
      >
        <Box sx={{ flexGrow: 1, flexShrink: 0 }}>
          {wideScreen && (
            <Box sx={{ minWidth: w, position: 'sticky', top: '16px' }}>
              <FloatingActions direction={'down'} wide={true} />
            </Box>
          )}
        </Box>

        <Container
          id="cart"
          maxWidth="md"
          sx={{
            position: 'relative',
            flexGrow: 0,
            flexShrink: 0,
          }}
        >
          {fullData.sort(priceSortFn).map((item) => {
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

          {!wideScreen && <Divider sx={{ mb: 3 }} />}

          {!wideScreen && (
            <Box sx={{ textAlign: 'center' }}>
              <PriceSummary
                fullPrice={fullPrice}
                discountPrice={discountPrice}
                totalDiscount={totalDiscount}
              />
            </Box>
          )}

          {!wideScreen && <FloatingActions direction={'right'} wide={false} />}
          <LinkedButton
            data-no-export
            to="/list"
            fullWidth
            variant="contained"
            search={{ s }}
            sx={{
              mt: 2,
              position: 'static',
            }}
          >
            <HouseIcon color="secondary" />
          </LinkedButton>
        </Container>

        <Box sx={{ flexGrow: 1, flexShrink: 0, display: 'flex' }}>
          {wideScreen && (
            <Paper
              elevation={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: w,
                position: 'sticky',
                alignSelf: 'flex-start',
                top: '16px',
                textAlign: 'left',
                borderRadius: '4px',
                p: 2,
              }}
            >
              <PriceSummary
                fullPrice={fullPrice}
                discountPrice={discountPrice}
                totalDiscount={totalDiscount}
              />
            </Paper>
          )}
        </Box>
      </Container>
    </>
  )
}
