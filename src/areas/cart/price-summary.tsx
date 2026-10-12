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

  let fullPrice = 0
  let discountPrice = 0
  let totalDiscount = 0

  for (const item of fullData) {
    const price = item.product?.price ?? 0
    const quantity = Number.parseInt(item.quantity, 10)
    const discount = Number.parseInt(item.discount, 10)
    const itemDiscount = Math.ceil((price * discount) / 100)

    fullPrice += price * quantity
    discountPrice += (price - itemDiscount) * quantity
    totalDiscount += itemDiscount * quantity
  }

  return (
    <>
      {totalDiscount > 0 && (
        <>
          <Box>Разом: {fullPrice} грн</Box>
          <Box>
            Знижка:{' '}
            <Box sx={{ fontWeight: 'bold', color: 'primary.main' }} component="span">
              {totalDiscount} грн
            </Box>
          </Box>
        </>
      )}

      <Box>До оплати: {discountPrice} грн</Box>
    </>
  )
}
