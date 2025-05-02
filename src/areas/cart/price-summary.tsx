import { Box } from '@mui/material'

import { useCartItems } from '../../hooks/use-cart-items.ts'
import { findProduct } from '../../tools.tsx'
import { useAllData } from '../../use-data.ts'

export const PriceSummary = () => {
  const data = useAllData()
  const cartItems = useCartItems()
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

  return (
    <>
      {totalDiscount > 0 && (
        <>
          <Box>Разом: {fullPrice} грн</Box>
          <Box>
            Знижка:{' '}
            <Box
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
              component="span"
            >
              {totalDiscount} грн
            </Box>
          </Box>
        </>
      )}

      <Box>До оплати: {discountPrice} грн</Box>
    </>
  )
}
