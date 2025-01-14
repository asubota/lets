import { FC } from 'react'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { useSetPropOnCart } from '../../cart-api.ts'
import { SubmitHandler, useForm } from 'react-hook-form'

interface DiscountInputProps {
  discount: number
  itemId: string
}

interface DiscountForm {
  discount: string
}

export const DiscountInput: FC<DiscountInputProps> = ({
  itemId,
  discount: currentDiscount,
}) => {
  const { mutate } = useSetPropOnCart()
  const { register, handleSubmit, setValue } = useForm<DiscountForm>({
    defaultValues: {
      discount: String(currentDiscount),
    },
  })

  const onSubmit: SubmitHandler<DiscountForm> = ({ discount }) => {
    const value = discount.replace(/\D/g, '')

    if (value && value !== String(currentDiscount)) {
      mutate({ itemId, discount: value })
    }
  }

  return (
    <TextField
      {...register('discount')}
      component="form"
      onBlur={(e) => {
        const value = e.target.value.replace(/\D/g, '')

        if (!value) {
          setValue('discount', '0')
          mutate({ itemId, discount: '0' })
        }

        if (value && value !== String(currentDiscount)) {
          mutate({ itemId, discount: value })
        }

        if (value && value !== e.target.value) {
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
            maxWidth: '50px',
            textAlign: 'right',
          },
        },
      }}
    />
  )
}
