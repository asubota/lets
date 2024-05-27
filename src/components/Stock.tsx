import { Box, Chip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { FC } from 'react'

export const Stock: FC<{ stock: string | null }> = ({ stock }) => {
  return !stock ? (
    <Box
      sx={{
        'fontSize': 0,
        'border': '2px solid',
        'borderColor': 'primary.main',
        '& > svg': {
          fontSize: '16px',
        },
      }}
    >
      <CheckIcon color="primary" />
    </Box>
  ) : (
    <Chip
      label={stock}
      color="primary"
      size="small"
      variant="outlined"
      sx={{ borderRadius: 0, borderWidth: '2px' }}
    />
  )
}
