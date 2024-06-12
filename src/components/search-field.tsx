import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { Cancel, Search } from '@mui/icons-material'
import { FC, useState, useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SearchHistory } from './search-history.tsx'
import { useIsLoading } from '../use-data.ts'
import LoopIcon from '@mui/icons-material/Loop'
import { clsx } from 'clsx'
import { SearchSuggestions } from './search-suggestions.tsx'

interface FormData {
  input: string
}

export const SearchField: FC<{ onSubmit: SubmitHandler<FormData> }> = ({
  onSubmit,
}) => {
  const loading = useIsLoading()
  const ref = useRef<HTMLDivElement | null>(null)
  const { control, handleSubmit, setValue, watch, resetField } =
    useForm<FormData>({ defaultValues: { input: '' } })
  const [showHistory, setShowHistory] = useState(false)
  const [showAhead, setShowAhead] = useState(false)
  const inputValue = watch('input')

  const handleFormReset = () => {
    resetField('input', { defaultValue: '' })
    void handleSubmit(onSubmit)()
  }

  const handleFocus = () => {
    setShowHistory(true)
    setShowAhead(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      if (inputValue) {
        setShowHistory(false)
      }
    }, 100)
  }

  return (
    <>
      <Box sx={{ pt: 2 }} ref={ref}>
        <Controller
          name="input"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                sx={{ '& .MuiInputBase-root': { overflow: 'hidden' } }}
                component="form"
                label="Search"
                variant="outlined"
                fullWidth
                size="small"
                {...field}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={loading}
                onSubmit={(event) => void handleSubmit(onSubmit)(event)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ marginRight: -2 }}>
                      <IconButton
                        onClick={handleFormReset}
                        size="small"
                        sx={{
                          'visibility': inputValue ? 'visible' : 'hidden',
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
          void handleSubmit(onSubmit)()
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
          void handleSubmit(onSubmit)()
        }}
      />
    </>
  )
}
