import { type ChangeEvent, useEffect, useState } from 'react'

import { Box, Slider, TextField } from '@mui/material'

import { useAppActions, useSearchOptions } from '../store'

export const RangeSearch = ({ min, max }: { min: number; max: number }) => {
  const { priceMin, priceMax, rangeMin, rangeMax } = useSearchOptions()
  const { setSearchOptions } = useAppActions()

  const [localMin, setLocalMin] = useState(min)
  const [localMax, setLocalMax] = useState(max)

  const handleLocalChange = (key: 'min' | 'max') => (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (key === 'min') {
      setLocalMin(val)
    } else {
      setLocalMax(val)
    }
  }

  const handleBlur = () => {
    let min = Math.min(localMin, localMax)
    let max = Math.max(localMin, localMax)

    const updates = {
      priceMin: min,
      priceMax: max,
    }

    setSearchOptions(updates)
  }

  const handleSliderChange = (_: unknown, newValue: number | number[]) => {
    const [newMin, newMax] = newValue as [number, number]
    setSearchOptions({
      priceMin: newMin,
      priceMax: newMax,
    })
  }

  useEffect(() => {
    setLocalMin(min)
    setLocalMax(max)
    setSearchOptions({
      rangeMin: min,
      rangeMax: max,
      priceMin: min,
      priceMax: max,
    })
  }, [min, max, setSearchOptions])

  return (
    <Box
      sx={{
        mt: 1,
        width: '100%',
        maxWidth: 500,
        px: 2,
        boxSizing: 'border-box',
        mx: 'auto',
        pt: 3,
        mb: 1,
      }}
    >
      <Slider
        valueLabelDisplay="on"
        size="small"
        value={[priceMin, priceMax]}
        onChange={handleSliderChange}
        min={rangeMin}
        max={rangeMax}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <TextField
          label="Min"
          type="number"
          value={localMin}
          onChange={handleLocalChange('min')}
          onBlur={handleBlur}
          size="small"
        />
        <TextField
          label="Max"
          type="number"
          value={localMax}
          onChange={handleLocalChange('max')}
          onBlur={handleBlur}
          size="small"
        />
      </Box>
    </Box>
  )
}
