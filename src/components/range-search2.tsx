import { useState } from 'react'

import { Box, Slider, TextField } from '@mui/material'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useAppActions, useSearchOptions } from '../store'

type FormValues = {
  priceMin: number
  priceMax: number
}

export const RangeSearch2 = () => {
  const { priceMin, priceMax, rangeMin, rangeMax } = useSearchOptions()
  const { setSearchOptions } = useAppActions()
  const [localValue, setLocalValue] = useState<[number, number]>([priceMin, priceMax])

  const handleSliderChange = (_: unknown, newValue: number | number[]) => {
    setLocalValue(newValue as [number, number])
  }

  const { register, handleSubmit, setValue } = useForm<FormValues>({ values: { priceMin, priceMax } })

  const handleSliderChangeCommitted = (_: unknown, newValue: number | number[]) => {
    const [priceMin, priceMax] = newValue as [number, number]
    setSearchOptions({ priceMin, priceMax })
    setValue('priceMin', priceMin)
    setValue('priceMax', priceMax)
  }

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setSearchOptions({ priceMin: +values.priceMin, priceMax: +values.priceMax })
  }

  const handleBlur = () => handleSubmit(onSubmit)()

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        my: 1,
        border: '1px solid',
        borderRadius: 1,
        borderColor: 'text.secondary',
        py: 1,
        px: 3,
      }}
    >
      <Box sx={{ mx: 1 }}>
        <Slider
          valueLabelDisplay="off"
          size="small"
          value={localValue}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
          min={rangeMin}
          max={rangeMax}
          sx={{
            '& .MuiSlider-valueLabel': { backgroundColor: 'primary.main' },
            '& .MuiSlider-valueLabelLabel': {
              fontWeight: 'bold',
              fontSize: '14px',
            },
          }}
        />
      </Box>

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField label="Min" size="small" {...register('priceMin')} onBlur={handleBlur} />
        <TextField label="Max" size="small" {...register('priceMax')} onBlur={handleBlur} />
      </Box>
    </Box>
  )
}
