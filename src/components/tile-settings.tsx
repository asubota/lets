import { FC } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  useGetMaxBySku,
  useGetMinBySku,
  useSkuSettingsActions,
} from '../store/sku-settings.ts'

const sx = {
  'maxWidth': '122px',
  '& input': {
    pt: '2px',
    pb: '2px',
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

export const TileSettings: FC<{ sku: string }> = ({ sku }) => {
  const min = useGetMinBySku(sku)
  const max = useGetMaxBySku(sku)
  const { setSetting, removeSku } = useSkuSettingsActions()
  const handleReset = () => removeSku(sku)

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
          setSetting(sku, { min: e.target.value.replace(/\D/g, '') })
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
          setSetting(sku, { max: e.target.value.replace(/\D/g, '') })
        }}
        InputProps={getInputProps('більш ніж')}
        sx={sx}
      />
    </>
  )
}
