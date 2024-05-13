import { FC, useState } from 'react'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { List } from './list.tsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Search, Cancel } from '@mui/icons-material'

interface FormData {
  input: string
}

export const SearchSection: FC = () => {
  const { register, handleSubmit, watch, resetField } = useForm<FormData>()
  const [search, setSearch] = useState('')
  const onSubmit: SubmitHandler<FormData> = (data) => setSearch(data.input)
  const handleFormReset = () => {
    resetField('input', { defaultValue: '' })
    void handleSubmit(onSubmit)()
  }

  return (
    <Box>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{
            'minWidth': '300px',
            '& .MuiInputBase-root': { overflow: 'hidden' },
          }}
          component="form"
          label="Search"
          variant="outlined"
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
                    '& svg': { width: '18px', height: '18px' },
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

      <Box sx={{ p: 1, pt: 0 }}>
        <List search={search} />
      </Box>
    </Box>
  )
}
