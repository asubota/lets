import { type FC, type KeyboardEventHandler } from 'react'

import { Cancel, Search } from '@mui/icons-material'
import LoopIcon from '@mui/icons-material/Loop'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { clsx } from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'

import { type SearchForm } from '../../../types.ts'
import { useIsLoading } from '../../../use-data.ts'

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

  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      reset({ input: '' })
    }
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
            onKeyUp={handleKeyUp}
            slotProps={{
              input: {
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
              },
            }}
          />
        )
      }}
    />
  )
}
