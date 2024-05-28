import { Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { FC } from 'react'

export const Stock: FC<{ stock: string | null }> = ({ stock }) => {
  return stock ? (
    <Typography
      component="span"
      sx={{
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: '14px',
      }}
    >
      {stock}
    </Typography>
  ) : (
    <CheckIcon color="secondary" fontSize="small" />
  )
}
