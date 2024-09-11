import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { Cancel, Search } from '@mui/icons-material'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import LoopIcon from '@mui/icons-material/Loop'
import { clsx } from 'clsx'
import { useIsLoading } from '../../../use-data.ts'
import { SearchForm } from '../../../types.ts'

export const SearchField: FC<{
  onSubmit(): void
  onFocus(): void
}> = ({ onSubmit, onFocus }) => {
  const loading = useIsLoading()
  const { control, reset } = useFormContext<SearchForm>()

  const handleFormReset = () => {
    reset()
    onSubmit()
  }

  return (
    <Controller
      name="input"
      control={control}
      render={({ field }) => {
        return (
          <TextField
            sx={{ '& .MuiInputBase-root': { overflow: 'hidden' } }}
            label="Search"
            variant="outlined"
            fullWidth
            size="small"
            {...field}
            onFocus={onFocus}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ marginRight: -2 }}>
                  <IconButton
                    onClick={handleFormReset}
                    size="small"
                    sx={{
                      'color': 'text.secondary',
                      'visibility': field.value ? 'visible' : 'hidden',
                      '& svg': { width: '26px', height: '26px' },
                    }}
                  >
                    <Cancel />
                  </IconButton>

                  <Box sx={{ backgroundColor: 'primary.main' }}>
                    <IconButton
                      type={loading ? 'button' : 'submit'}
                      sx={{ color: 'primary.contrastText' }}
                      className={clsx({ rotate: loading })}
                    >
                      {loading ? <LoopIcon /> : <Search />}
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        )
      }}
    />
  )
}
