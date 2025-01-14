import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Slider,
} from '@mui/material'
import { FC, useState } from 'react'
import { Product } from '../types.ts'
import { useNoScroll } from '../hooks/use-no-scroll.ts'

const discounts = [3, 5, 7, 10, 12, 15]

const Block: FC<{ label: string; value: number; red?: boolean }> = ({
  label,
  value,
  red,
}) => {
  return (
    <Box>
      {label}{' '}
      <Box
        component="span"
        sx={{
          fontWeight: 'bold',
          ...(red && {
            color: 'primary.main',
          }),
        }}
      >
        {value}
      </Box>
      <Box
        component="span"
        sx={{
          ml: '2px',
          ...(red && {
            color: 'primary.main',
          }),
        }}
      >
        грн
      </Box>
    </Box>
  )
}

const valueLabelFormat = (value: number) => `${value}%`

export const PercentsPopup: FC<{ product: Product; onClose: () => void }> = ({
  product,
  onClose,
}) => {
  useNoScroll()
  const [discount, setDiscount] = useState(7)
  const handleChange = (_: Event, newValue: number | number[]) => {
    setDiscount(newValue as number)
  }
  const discountValue = Math.round((product.price * discount) / 100)
  const priceWithDiscount = Math.round(product.price - discountValue)

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{}} fullWidth>
      <DialogTitle
        typography="subtitle2"
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '6px',
        }}
      >
        {product.name}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ p: 3, pb: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 5,
            }}
          >
            <Block label="Повна ціна" value={product.price} />
            <Block label="Ціна зі знижкою" value={priceWithDiscount} />
            <Block label="Знижка" value={discountValue} red />
          </Box>

          <Slider
            valueLabelDisplay="on"
            step={1}
            marks
            min={3}
            max={15}
            track={false}
            value={discount}
            onChange={handleChange}
            color="secondary"
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
            sx={{
              '& .MuiSlider-valueLabel': {
                backgroundColor: 'primary.main',
              },
              '& .MuiSlider-valueLabelLabel': {
                fontWeight: 'bold',
                fontSize: '16px',
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ButtonGroup variant="contained" size="small">
              {discounts.map((value) => {
                return (
                  <Button
                    key={value}
                    onClick={() => setDiscount(value)}
                    color={value === discount ? 'primary' : 'secondary'}
                  >
                    {value}%
                  </Button>
                )
              })}
            </ButtonGroup>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
