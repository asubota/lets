import { type FC } from 'react'

import { Chip } from '@mui/material'

import { useVendorColor } from '../hooks/use-vendor-color.ts'

export const VendorChip: FC<{
  vendor: string
  source?: 'live' | 'preview'
  color?: string
  borderColor?: string
  backgroundColor?: string
  onClick?: (vendor: string) => void
}> = ({ vendor, color, borderColor, backgroundColor, source = 'live', onClick }) => {
  const {
    color: liveColor,
    borderColor: liveBorderColor,
    backgroundColor: liveBackgroundColor,
  } = useVendorColor(vendor)

  const colorValue = (source === 'live' ? liveColor : color) || 'secondary'
  const borderColorValue = (source === 'live' ? liveBorderColor : borderColor) || 'secondary.main'
  const backgroundColorValue = source === 'live' ? liveBackgroundColor : backgroundColor

  const handleClick = () => {
    if (onClick) {
      onClick(vendor)
    }
  }

  return vendor !== 'base' ? (
    <Chip
      data-no-export
      label={vendor}
      size="small"
      variant="outlined"
      onClick={handleClick}
      sx={{
        borderWidth: '2px',
        borderColor: borderColorValue,
        color: colorValue,
        backgroundColor: backgroundColorValue,
      }}
    />
  ) : (
    <Chip data-no-export label={vendor} color="primary" size="small" />
  )
}
