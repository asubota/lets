import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { Cancel, Search } from '@mui/icons-material'
import { FC, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { SearchHistory } from './search-history.tsx'
import { useIsLoading } from '../use-data.ts'
import LoopIcon from '@mui/icons-material/Loop'
import { clsx } from 'clsx'
import { SearchSuggestions } from './search-suggestions.tsx'
import { SearchForm } from '../types.ts'

export const SearchField: FC<{
  disabled: boolean
  onSubmit(): void
}> = ({ disabled, onSubmit }) => {
  const loading = useIsLoading()
  const ref = useRef<HTMLDivElement | null>(null)
  const { setValue, control, watch, reset } = useFormContext<SearchForm>()

  const [showHistory, setShowHistory] = useState(false)
  const [showAhead, setShowAhead] = useState(false)
  const inputValue = watch('input')

  const handleFocus = () => {
    setShowHistory(true)
    setShowAhead(true)
  }

  const handleFormReset = () => {
    reset()
    onSubmit()

    setShowHistory(false)
    setShowAhead(false)
  }

  return (
    <>
      <Box ref={ref}>
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
                onFocus={handleFocus}
                disabled={loading || disabled}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ marginRight: -2 }}>
                      <IconButton
                        onClick={handleFormReset}
                        size="small"
                        disabled={disabled}
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
      </Box>

      <SearchHistory
        open={showHistory && !inputValue.length}
        anchorEl={ref.current}
        onClickAway={() => setShowHistory(false)}
        setValue={(value: string) => {
          setValue('input', value)
          setShowAhead(false)
          onSubmit()
        }}
      />

      <SearchSuggestions
        search={inputValue}
        open={showAhead && inputValue.length >= 3}
        anchorEl={ref.current}
        onClickAway={() => setShowAhead(false)}
        setValue={(value: string) => {
          setValue('input', value)
          setShowAhead(false)
          onSubmit()
        }}
      />
    </>
  )
}
