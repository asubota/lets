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

  return (
    <Chip
      data-no-export
      label={vendor}
      size="small"
      onClick={handleClick}
      sx={{
        'fontFamily': '"Outfit", sans-serif',
        'fontWeight': 700,
        'fontSize': '10px',
        'height': '24px',
        'textTransform': 'uppercase',
        'letterSpacing': '0.5px',
        'border': '1px solid',
        'borderColor': vendor === 'base' ? 'primary.main' : borderColorValue,
        'color': vendor === 'base' ? 'primary.main' : colorValue,
        'background':
          vendor === 'base'
            ? 'rgba(234, 43, 6, 0.1)'
            : backgroundColorValue?.includes('gradient')
              ? backgroundColorValue
              : undefined,
        'backgroundColor':
          vendor === 'base' || backgroundColorValue?.includes('gradient')
            ? undefined
            : backgroundColorValue,
        'borderRadius': '8px',
        '& .MuiChip-label': { px: 1 },
      }}
    />
  )
}
