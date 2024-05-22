import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { Cancel, Search } from '@mui/icons-material'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormData {
  input: string
}

export const SearchField: FC<{ onSubmit: SubmitHandler<FormData> }> = ({
  onSubmit,
}) => {
  const { register, handleSubmit, watch, resetField } = useForm<FormData>()

  const handleFormReset = () => {
    resetField('input', { defaultValue: '' })
    void handleSubmit(onSubmit)()
  }

  return (
    <Box sx={{ pt: 2, display: 'flex', justifyContent: 'center' }}>
      <TextField
        sx={{ '& .MuiInputBase-root': { overflow: 'hidden' } }}
        component="form"
        label="Search"
        variant="outlined"
        fullWidth
        size="small"
        {...register('input')}
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ marginRight: -2 }}>
              <IconButton
                onClick={handleFormReset}
                size="small"
                sx={{
                  'visibility': watch('input') ? 'visible' : 'hidden',
                  '& svg': { width: '20px', height: '20px' },
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
    </Box>
  )
}
