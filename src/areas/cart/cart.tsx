import { Box, Button, Container, Divider, Paper } from '@mui/material'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import { createLink, Outlet, useSearch } from '@tanstack/react-router'
import ConstructionIcon from '@mui/icons-material/Construction'
import { useAllData, useIsLoading } from '../../use-data.ts'
import { findProduct } from '../../tools.tsx'
import HouseIcon from '@mui/icons-material/House'
import { EmptyCart } from './empty-cart.tsx'
import { LoadingCart } from './loading-cart.tsx'
import { PriceSummary } from './price-summary.tsx'
import { CartItem, Product } from '../../types.ts'
import { FloatingActions } from './floating-actions.tsx'
import { useMediaQuery } from '../../hooks/use-media-query.ts'
import { useCartItems } from '../../hooks/use-cart-items.ts'
import {
  POPULAR_SERViCE_PREFIX,
  REGULAR_SERViCE_PREFIX,
} from '../../constants.ts'
import { CartItemRow } from './cart-item-row.tsx'

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

function splitCart(items: CartItem[]) {
  return items.reduce(
    (acc, item) => {
      const key =
        item.itemId.startsWith(REGULAR_SERViCE_PREFIX) ||
        item.itemId.startsWith(POPULAR_SERViCE_PREFIX)
          ? 'services'
          : 'products'
      acc[key].push(item)
      return acc
    },
    { services: [] as CartItem[], products: [] as CartItem[] },
  )
}

export const Cart = () => {
  const wideScreen = useMediaQuery('(min-width: 1340px)')
  const { s } = useSearch({ from: '/cart' })

  const loading = useIsLoading()
  const data = useAllData()
  const cartItems = useCartItems()

  const fullData = cartItems.map((item) => {
    return { ...item, product: findProduct(item.itemId, data) }
  })

  const { services, products } = splitCart(fullData)

  if (loading) {
    return <LoadingCart />
  }

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <>
      <Outlet />

      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 2,
          pb: 2,
          pl: 0,
          pr: 0,
        }}
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
          {products.length > 0 && (
            <>
              <Divider>
                <DirectionsBikeIcon
                  sx={{ color: 'secondary.dark' }}
                  fontSize="small"
                />
              </Divider>

              {products.sort(priceSortFn).map((item) => {
                return <CartItemRow item={item} key={item.itemId} />
              })}
            </>
          )}

          {services.length > 0 && (
            <>
              <Divider>
                <ConstructionIcon
                  sx={{ color: 'secondary.light' }}
                  fontSize="small"
                />
              </Divider>

              {services.sort(priceSortFn).map((item) => {
                return <CartItemRow item={item} key={item.itemId} />
              })}
            </>
          )}

          {!wideScreen && <Divider sx={{ mb: 3 }} />}

          {!wideScreen && (
            <Box sx={{ textAlign: 'center' }}>
              <PriceSummary />
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
              <PriceSummary />
            </Paper>
          )}
        </Box>
      </Container>
    </>
  )
}
