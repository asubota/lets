import { type MouseEventHandler, useState } from 'react'

import { Box, Popover, Slider, Typography } from '@mui/material'

import { useSetPropertyOnCart } from '../../cart-api.ts'

interface DiscountProps {
  discount: number
  fullPrice: number
  itemId: string
}

const valueLabelFormat = (value: number) => `${value}%`

export const Discount = ({ discount, fullPrice, itemId }: DiscountProps) => {
  const { mutate } = useSetPropertyOnCart()
  const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(null)
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorElement(event.currentTarget)
  }
  const handleClose = () => {
    if (d !== discount) {
      mutate({ itemId, discount: String(d) })
    }
    setAnchorElement(null)
  }
  const open = Boolean(anchorElement)

  const [d, setD] = useState(discount)
  const handleChange = (_: Event, newValue: number | number[]) => {
    setD(newValue as number)
  }

  const discountValue = (fullPrice * d) / 100
  const priceWithDiscount = fullPrice - discountValue

  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={handleClick}>
        Знижка:
      </Box>

      <Popover
        closeAfterTransition
        open={open}
        anchorEl={anchorElement}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Box sx={{ m: '24px', mb: '4px', mt: '28px' }}>
          <Slider
            size="small"
            valueLabelDisplay="on"
            step={1}
            marks
            min={0}
            max={15}
            track={false}
            value={d}
            onChange={handleChange}
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
            sx={{
              '& .MuiSlider-valueLabel': {
                backgroundColor: 'primary.main',
                p: '4px',
                pt: '2px',
                pb: 0,
              },
              '& .MuiSlider-valueLabelLabel': {
                fontWeight: 'bold',
                fontSize: '12px',
              },
            }}
          />

          <Typography variant="body2">Повна ціна: {fullPrice} грн</Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: 'success.main',
            }}
          >
            Ціна зі знижкою: {priceWithDiscount.toFixed(2)} грн
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Знижка: {Math.ceil(discountValue)} грн
          </Typography>
        </Box>
      </Popover>
    </>
  )
}
