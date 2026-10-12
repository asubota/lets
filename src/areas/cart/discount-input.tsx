import { InputAdornment, TextField, Typography } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useSetPropertyOnCart } from '../../cart-api.ts'

interface DiscountInputProps {
  discount: number
  itemId: string
}

interface DiscountForm {
  discount: string
}

export const DiscountInput = ({ itemId, discount: currentDiscount }: DiscountInputProps) => {
  const { mutate } = useSetPropertyOnCart()
  const { register, handleSubmit, setValue } = useForm<DiscountForm>({
    defaultValues: {
      discount: String(currentDiscount),
    },
  })

  const onSubmit: SubmitHandler<DiscountForm> = ({ discount }) => {
    const value = discount.replaceAll(/\D/g, '')

    if (value && value !== String(currentDiscount)) {
      mutate({ itemId, discount: value })
    }
  }

  return (
    <TextField
      {...register('discount')}
      component="form"
      onBlur={(event) => {
        const value = event.target.value.replaceAll(/\D/g, '')

        if (!value) {
          setValue('discount', '0')
          mutate({ itemId, discount: '0' })
        }

        if (value && value !== String(currentDiscount)) {
          mutate({ itemId, discount: value })
        }

        if (value && value !== event.target.value) {
          setValue('discount', value)
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
      variant="standard"
      size="small"
      sx={{
        '& .MuiInput-root:before': {
          borderBottom: 'none',
        },
        '& input': {
          textAlign: 'right',
        },
      }}
      slotProps={{
        input: {
          type: 'tel',
          endAdornment: (
            <InputAdornment position="end">
              <Typography sx={{ fontSize: '16px', ml: '-6px' }} variant="body2">
                %
              </Typography>
            </InputAdornment>
          ),
          sx: {
            maxWidth: '60px',
          },
        },
      }}
    />
  )
}
