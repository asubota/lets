import { type KeyboardEventHandler } from 'react'

import { Cancel, Search } from '@mui/icons-material'
import LoopIcon from '@mui/icons-material/Loop'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { clsx } from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'

import { type SearchForm } from '../../../types.ts'
import { useIsLoading } from '../../../use-data.ts'

interface SearchFieldProps {
  onSubmit(): void
  onFocus(): void
}

export const SearchField = ({ onSubmit, onFocus }: SearchFieldProps) => {
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
            sx={{
              '& .MuiInputBase-root': {
                'borderRadius': '12px',
                'backgroundColor': (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.03)',
                '& fieldset': { border: 'none' },
                '&:hover': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.05)',
                },
                '&.Mui-focused': {
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.07)',
                },
              },
              '& .MuiInputLabel-root': {
                fontFamily: '"Outfit", sans-serif',
                fontSize: '14px',
              },
              '& input': {
                fontFamily: '"Outfit", sans-serif',
                fontSize: '14px',
              },
            }}
            placeholder="Шукати запчастини..."
            variant="outlined"
            fullWidth
            size="small"
            {...field}
            onFocus={onFocus}
            disabled={loading}
            onKeyUp={handleKeyUp}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      sx={{
                        color: 'text.secondary',
                        fontSize: '20px',
                        ml: 0.5,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: -1 }}>
                    {field.value && (
                      <IconButton
                        onClick={handleFormReset}
                        size="small"
                        sx={{
                          'color': 'text.secondary',
                          '& svg': { width: '20px', height: '20px' },
                        }}
                      >
                        <Cancel />
                      </IconButton>
                    )}
                    <Box
                      sx={{
                        ml: 1,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        bgcolor: 'primary.main',
                      }}
                    >
                      <IconButton
                        type={loading ? 'button' : 'submit'}
                        sx={{
                          color: 'primary.contrastText',
                          p: 1,
                          borderRadius: 0,
                        }}
                        className={clsx({ rotate: loading })}
                      >
                        {loading ? (
                          <LoopIcon sx={{ fontSize: '20px' }} />
                        ) : (
                          <Search sx={{ fontSize: '20px' }} />
                        )}
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
