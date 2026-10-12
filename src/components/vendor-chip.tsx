import { Chip } from '@mui/material'

import { useVendorColor } from '../hooks/use-vendor-color.ts'

export const VendorChip = ({
  vendor,
  color,
  borderColor,
  backgroundColor,
  source = 'live',
  onClick,
}: {
  vendor: string
  source?: 'live' | 'preview'
  color?: string | undefined
  borderColor?: string | undefined
  backgroundColor?: string | undefined
  onClick?: (vendor: string) => void
}) => {
  const {
    color: liveColor,
    borderColor: liveBorderColor,
    backgroundColor: liveBackgroundColor,
  } = useVendorColor(vendor)

  const colorValue = (source === 'live' ? liveColor : color) || 'secondary'
  const borderColorValue = (source === 'live' ? liveBorderColor : borderColor) || 'secondary.main'
  const backgroundColorValue = source === 'live' ? liveBackgroundColor : backgroundColor
  const gradientValue = backgroundColorValue?.includes('gradient') ? backgroundColorValue : undefined
  const isBase = vendor === 'base'

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
        'borderColor': isBase ? 'primary.main' : borderColorValue,
        'color': isBase ? 'primary.main' : colorValue,
        'background': isBase ? 'rgba(234, 43, 6, 0.1)' : gradientValue,
        'backgroundColor': isBase || gradientValue ? undefined : backgroundColorValue,
        'borderRadius': '8px',
        '& .MuiChip-label': { px: 1 },
      }}
    />
  )
}
