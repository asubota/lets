import { FC } from 'react'
import { InputAdornment, TextField } from '@mui/material'

export const TileSettings: FC = () => {
  return (
    <>
      <TextField
        type="number"
        size="small"
        InputProps={{
          startAdornment: <InputAdornment position="start">min</InputAdornment>,
        }}
        sx={{
          '& input': {
            pt: '2px',
            pb: '2px',
          },
        }}
      />
      <TextField
        type="number"
        size="small"
        InputProps={{
          startAdornment: <InputAdornment position="start">max</InputAdornment>,
        }}
        sx={{
          '& input': {
            pt: '2px',
            pb: '2px',
          },
        }}
      />
    </>
  )
}
