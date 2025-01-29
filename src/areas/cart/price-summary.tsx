import { FC } from 'react'
import { Box } from '@mui/material'

interface PriceSummaryProps {
  totalDiscount: number
  fullPrice: number
  discountPrice: number
}

export const PriceSummary: FC<PriceSummaryProps> = ({
  fullPrice,
  discountPrice,
  totalDiscount,
}) => {
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
