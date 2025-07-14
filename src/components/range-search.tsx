import { useState } from 'react'

import { Box, Slider, TextField } from '@mui/material'

import { useAppActions, useSearchOptions } from '../store'

export const RangeSearch = () => {
  const { priceMin, priceMax, rangeMin, rangeMax } = useSearchOptions()
  const { setSearchOptions } = useAppActions()
  const [localValue, setLocalValue] = useState<[number, number]>([priceMin, priceMax])

  const handleSliderChange = (_: unknown, newValue: number | number[]) => {
    setLocalValue(newValue as [number, number])
  }
  const handleSliderChangeCommitted = (_: unknown, newValue: number | number[]) => {
    const [priceMin, priceMax] = newValue as [number, number]
    setSearchOptions({ priceMin, priceMax })
  }

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
        pb: 1,
        pt: 4,
        px: 3,
      }}
    >
      <Box sx={{ mx: 1 }}>
        <Slider
          valueLabelDisplay="on"
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
        <TextField
          label="Min"
          size="small"
          defaultValue={rangeMin}
          onBlur={(e) => {
            const value = Number(e.target.value.replace(/\D/g, '') || rangeMin)
            const newPriceMin = Math.max(priceMin, value)

            setSearchOptions({ rangeMin: value, priceMin: newPriceMin })
            setLocalValue(([min, max]) => [Math.max(newPriceMin, min), max])
          }}
        />
        <TextField
          label="Max"
          size="small"
          defaultValue={rangeMax}
          onBlur={(e) => {
            const value = Number(e.target.value.replace(/\D/g, '') || rangeMax)
            const newPriceMax = Math.min(priceMax, value)

            setSearchOptions({ rangeMax: value, priceMax: newPriceMax })
            setLocalValue(([min, max]) => [min, Math.min(newPriceMax, max)])
          }}
        />
      </Box>
    </Box>
  )
}
