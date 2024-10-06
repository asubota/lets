import { FC } from 'react'
import {
  Box,
  IconButton,
  InputAdornment,
  Portal,
  TextField,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useToggleFavorite } from '../../api.ts'
import { Cancel } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'

type FavoriteInputForm = {
  sku: string
}

export const FavoriteInput: FC = () => {
  const { watch, register, handleSubmit, reset } = useForm<FavoriteInputForm>(
    {},
  )
  const { mutate } = useToggleFavorite()

  const onSubmit: SubmitHandler<FavoriteInputForm> = ({ sku }) => {
    const favoriteId = sku.includes(':') ? sku : `${sku}:hand`

    reset({ sku: '' })
    mutate({ favoriteId, isFavorite: true })
  }

  const value = watch('sku')

  return (
    <Portal container={() => document.getElementById('app-bar-center')}>
      <TextField
        sx={{ '& .MuiInputBase-root': { overflow: 'hidden' } }}
        label="Add new Favorite"
        size="small"
        fullWidth
        {...register('sku')}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" sx={{ marginRight: -2 }}>
                <IconButton
                  onClick={() => reset()}
                  size="small"
                  sx={{
                    'color': 'text.secondary',
                    'visibility': value ? 'visible' : 'hidden',
                    '& svg': { width: '26px', height: '26px' },
                  }}
                >
                  <Cancel />
                </IconButton>

                <Box sx={{ backgroundColor: 'primary.main' }}>
                  <IconButton
                    type="submit"
                    sx={{ color: 'primary.contrastText' }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </InputAdornment>
            ),
          },
        }}
      />
    </Portal>
  )
}
