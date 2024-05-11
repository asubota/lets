import { FC, useState } from 'react'
import { Box, TextField } from '@mui/material'
import { List } from './list.tsx'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormData {
  input: string
}

export const Search: FC = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const [search, setSearch] = useState('')
  const onSubmit: SubmitHandler<FormData> = (data) => setSearch(data.input)

  return (
    <Box>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <TextField
          component="form"
          label="Search"
          variant="outlined"
          size="small"
          {...register('input')}
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <List search={search} />
      </Box>
    </Box>
  )
}
