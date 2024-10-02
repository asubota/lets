import { FC } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useGetPropFromFavorite, useSetPropOnFavorite } from '../api.ts'

const sx = {
  'maxWidth': '122px',
  '& input': {
    pt: '4px',
    pb: '4px',
    height: '20px',
    color: 'primary.main',
    fontSize: '14px',
    textAlign: 'end',
  },
}

const getInputProps = (text: string) => {
  return {
    startAdornment: (
      <InputAdornment
        sx={{
          '& p': {
            fontSize: '12px',
            color: 'text.dark',
          },
        }}
        position="start"
      >
        {text}
      </InputAdornment>
    ),
  }
}

export const TileSettings: FC<{ favoriteId: string }> = ({ favoriteId }) => {
  const min = useGetPropFromFavorite(favoriteId, 'min')
  const max = useGetPropFromFavorite(favoriteId, 'max')
  const { mutate } = useSetPropOnFavorite()
  const handleReset = () => mutate({ favoriteId, min: '', max: '' })

  const minKey = `${min}-min-key`
  const maxKey = `${max}-max-key`

  return (
    <>
      {(min || max) && (
        <IconButton
          size="small"
          sx={{ pt: '2px', pb: '2px', color: 'text.secondary' }}
          onClick={handleReset}
        >
          <HighlightOffIcon fontSize="small" />
        </IconButton>
      )}

      <TextField
        type="number"
        size="small"
        key={minKey}
        defaultValue={min}
        onBlur={(e) => {
          const value = e.target.value.replace(/\D/g, '')

          if (value !== (min || '').toString()) {
            mutate({
              favoriteId,
              min: value,
            })
          }
        }}
        InputProps={getInputProps('менш ніж')}
        sx={sx}
      />
      <TextField
        type="number"
        size="small"
        key={maxKey}
        defaultValue={max}
        onBlur={(e) => {
          const value = e.target.value.replace(/\D/g, '')

          if (value !== (max || '')?.toString()) {
            mutate({
              favoriteId,
              max: e.target.value.replace(/\D/g, ''),
            })
          }
        }}
        InputProps={getInputProps('більш ніж')}
        sx={sx}
      />
    </>
  )
}
