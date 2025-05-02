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
        color="primary"
        size="small"
        variant="outlined"
        sx={{
          borderRadius: 0,
          borderWidth: '2px',
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
