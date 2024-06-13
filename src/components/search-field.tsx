import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { Cancel, Search } from '@mui/icons-material'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SearchHistory } from './search-history.tsx'
import { useIsLoading } from '../use-data.ts'
import LoopIcon from '@mui/icons-material/Loop'
import { clsx } from 'clsx'
import { SearchSuggestions } from './search-suggestions.tsx'

interface FormData {
  input: string
}

export const SearchField: FC<{
  onSubmit: SubmitHandler<FormData>
  el: HTMLDivElement | null
  disabled: boolean
}> = ({ onSubmit, el, disabled }) => {
  const loading = useIsLoading()

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
              disabled={loading || disabled}
              onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: -2 }}>
                    <IconButton
                      onClick={handleFormReset}
                      size="small"
                      disabled={disabled}
                      sx={{
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

      <SearchHistory
        open={showHistory && !inputValue.length}
        anchorEl={el}
        onClickAway={() => setShowHistory(false)}
        setValue={(value: string) => {
          setValue('input', value)
          void handleSubmit(onSubmit)()
        }}
      />

      <SearchSuggestions
        search={inputValue}
        open={showAhead && inputValue.length >= 3}
        anchorEl={el}
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
