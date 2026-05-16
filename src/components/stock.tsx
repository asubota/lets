import { type FC } from 'react'

import CheckIcon from '@mui/icons-material/Check'
import { Typography, Chip } from '@mui/material'

export const Stock: FC<{ stock: string | null; bordered?: boolean }> = ({
  stock,
  bordered,
}) => {
  if (!stock) {
    return <CheckIcon color="primary" fontSize="small" />
  }

  if (bordered) {
    return (
      <Chip
        label={stock}
        size="small"
        sx={{
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 800,
          fontSize: '11px',
          height: '22px',
          borderRadius: '8px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(234, 43, 6, 0.15)'
              : 'rgba(234, 43, 6, 0.09)',
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#fb923c' : '#ea2b06',
          border: 'none',
          '& .MuiChip-label': { px: 1 },
        }}
      />
    )
  }

  return (
    <Typography
      component="span"
      sx={{
        color: 'primary.main',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: '14px',
      }}
    >
      {stock}
    </Typography>
  )
}
