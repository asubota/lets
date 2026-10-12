import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'

import { useGetPropertyFromFavorite, useSetPropertyOnFavorite } from '../api.ts'

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
    type: 'tel',
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

export const TileSettings = ({ favoriteId }: { favoriteId: string }) => {
  const min = useGetPropertyFromFavorite(favoriteId, 'min')
  const max = useGetPropertyFromFavorite(favoriteId, 'max')
  const { mutate } = useSetPropertyOnFavorite()
  const handleReset = () => {
    mutate({ favoriteId, min: '', max: '' })
  }

  const minKey = `${min}-min-key`
  const maxKey = `${max}-max-key`

  return (
    <Box
      sx={{
        gridArea: 'meta',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '8px',
        mb: '2px',
      }}
    >
      {(Boolean(min) || Boolean(max)) && (
        <IconButton size="small" sx={{ pt: '2px', pb: '2px', color: 'text.secondary' }} onClick={handleReset}>
          <HighlightOffIcon fontSize="small" />
        </IconButton>
      )}
      <TextField
        size="small"
        key={minKey}
        defaultValue={min}
        onBlur={(event) => {
          const value = event.target.value.replaceAll(/\D/g, '')

          if (value !== (min ? min.toString() : '')) {
            mutate({
              favoriteId,
              min: value,
            })
          }
        }}
        sx={sx}
        slotProps={{
          input: getInputProps('менш ніж'),
        }}
      />
      <TextField
        size="small"
        key={maxKey}
        defaultValue={max}
        onBlur={(event) => {
          const value = event.target.value.replaceAll(/\D/g, '')

          if (value !== (max ? max.toString() : '')) {
            mutate({
              favoriteId,
              max: event.target.value.replaceAll(/\D/g, ''),
            })
          }
        }}
        sx={sx}
        slotProps={{
          input: getInputProps('більш ніж'),
        }}
      />
    </Box>
  )
}
