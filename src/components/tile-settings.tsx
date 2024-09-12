import { FC } from 'react'
import { InputAdornment, TextField } from '@mui/material'

export const TileSettings: FC = () => {
  return (
    <>
      <TextField
        type="number"
        size="small"
        InputProps={{
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
              min
            </InputAdornment>
          ),
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
              max
            </InputAdornment>
          ),
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
