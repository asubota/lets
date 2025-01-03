import { FC, KeyboardEventHandler } from 'react'
import {
  Box,
  IconButton,
  InputAdornment,
  Portal,
  TextField,
} from '@mui/material'
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
import { useToggleFavorite } from '../../api.ts'
import { Cancel } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import { useAllData } from '../../use-data.ts'
import { DUMMY_VENDOR } from '../../constants.ts'

export type FavoriteInputForm = {
  sku: string
}

export const FavoriteInput: FC = () => {
  const products = useAllData()
  const { watch, handleSubmit, reset, control } =
    useFormContext<FavoriteInputForm>()
  const { mutate } = useToggleFavorite()

  const onSubmit: SubmitHandler<FavoriteInputForm> = ({ sku }) => {
    if (sku.length === 0) {
      return
    }
    const value = [sku]

    if (!sku.includes(':')) {
      const lowerSku = sku.toLowerCase()
      const product = products.find(
        (p) => p.sku.toLowerCase() === lowerSku && p.vendor !== 'base',
      )

      if (product) {
        value.push(product.vendor)
      } else {
        value.push(DUMMY_VENDOR)
      }
    }

    reset({ sku: '' })
    mutate({ favoriteId: value.join(':'), isFavorite: true })
  }

  const value = watch('sku')
  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      reset({ sku: '' })
    }
  }

  return (
    <Portal container={() => document.getElementById('app-bar-center')}>
      <Controller
        name="sku"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              sx={{ '& .MuiInputBase-root': { overflow: 'hidden' } }}
              label="Add new Favorite"
              size="small"
              fullWidth
              {...field}
              onKeyUp={handleKeyUp}
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
          )
        }}
      />
    </Portal>
  )
}
