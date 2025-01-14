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
    <Box
      sx={{
        'textAlign': 'center',
        'mt': 2,

        '@media (min-width: 1270px)': {
          textAlign: 'left',
          position: 'absolute',
          top: 0,
          right: '8px',
          transform: 'translateX(100%)',
          backgroundColor: 'secondary.main',
          borderRadius: '4px',
          p: 1,
        },
      }}
    >
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
    </Box>
  )
}
