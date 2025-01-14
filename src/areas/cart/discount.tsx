import { FC, MouseEventHandler, useState } from 'react'
import { Box, Popover, Slider, Typography } from '@mui/material'
import { useSetPropOnCart } from '../../cart-api.ts'

interface DiscountProps {
  discount: number
  fullPrice: number
  itemId: string
}

const valueLabelFormat = (value: number) => `${value}%`

export const Discount: FC<DiscountProps> = ({
  discount,
  fullPrice,
  itemId,
}) => {
  const { mutate } = useSetPropOnCart()
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    if (d !== discount) {
      mutate({ itemId, discount: String(d) })
    }
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

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
        anchorEl={anchorEl}
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
          {discountValue > 0 && (
            <>
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
            </>
          )}
        </Box>
      </Popover>
    </>
  )
}
