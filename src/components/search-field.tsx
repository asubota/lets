import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { Cancel, Search } from '@mui/icons-material'
import { FC, useState, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SearchHistory } from './search-history.tsx'

interface FormData {
  input: string
}

export const SearchField: FC<{ onSubmit: SubmitHandler<FormData> }> = ({
  onSubmit,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { register, handleSubmit, setValue, watch, resetField } =
    useForm<FormData>({ defaultValues: { input: '' } })
  const [showHistory, setShowHistory] = useState(true)
  const inputValue = watch('input')

  const handleFormReset = () => {
    resetField('input', { defaultValue: '' })
    void handleSubmit(onSubmit)()
  }

  const handleFocus = () => setShowHistory(true)
  const handleBlur = () => setTimeout(() => setShowHistory(false), 100)

  return (
    <Box
      sx={{
        pt: 2,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <TextField
        sx={{ '& .MuiInputBase-root': { overflow: 'hidden' } }}
        component="form"
        label="Search"
        variant="outlined"
        fullWidth
        size="small"
        {...register('input')}
        inputRef={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ marginRight: -2 }}>
              <IconButton
                onClick={handleFormReset}
                size="small"
                sx={{
                  'visibility': watch('input') ? 'visible' : 'hidden',
                  '& svg': { width: '26px', height: '26px' },
                }}
              >
                <Cancel />
              </IconButton>

              <Box sx={{ backgroundColor: 'primary.main' }}>
                <IconButton
                  sx={{ color: 'primary.contrastText' }}
                  type="submit"
                >
                  <Search />
                </IconButton>
              </Box>
            </InputAdornment>
          ),
        }}
      />

      {showHistory && !inputValue.length && (
        <SearchHistory
          anchorEl={ref.current}
          setValue={(value: string) => {
            setValue('input', value)
            void handleSubmit(onSubmit)()
          }}
        />
      )}
    </Box>
  )
}
