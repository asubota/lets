import { FC } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import {
  useGetMaxBySku,
  useGetMinBySku,
  useSkuSettingsActions,
} from '../store/sku-settings.ts'

export const TileSettings: FC<{ sku: string }> = ({ sku }) => {
  const min = useGetMinBySku(sku)
  const max = useGetMaxBySku(sku)
  const { setSetting } = useSkuSettingsActions()

  return (
    <>
      <TextField
        type="number"
        size="small"
        defaultValue={min}
        onBlur={(e) => {
          setSetting(sku, { min: e.target.value.replace(/\D/g, '') })
        }}
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
        defaultValue={max}
        onBlur={(e) => {
          setSetting(sku, { max: e.target.value.replace(/\D/g, '') })
        }}
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
