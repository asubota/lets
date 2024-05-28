import { Typography, Chip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { FC } from 'react'

export const Stock: FC<{ stock: string | null; bordered?: boolean }> = ({
  stock,
  bordered,
}) => {
  if (bordered && stock) {
    return (
      <Chip
        label={stock}
        color="primary"
        size="small"
        variant="outlined"
        sx={{ borderRadius: 0, ml: 'auto', borderWidth: '2px' }}
      />
    )
  }

  return stock ? (
    <Typography
      component="span"
      sx={{
        ...(bordered
          ? {
              border: '2px solid',
              borderColor: 'primary.main',

              pl: 1,
              pr: 1,
              color: 'primary.main',
            }
          : {
              color: 'primary.main',
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontSize: '14px',
            }),
      }}
    >
      {stock}
    </Typography>
  ) : (
    <CheckIcon color="primary" fontSize="small" />
  )
}
