import { FC } from 'react'
import { Box } from '@mui/material'

export const ToolbarSeparator: FC = () => {
  return (
    <Box
      sx={{
        borderRight: '1px solid',
        borderColor: 'primary.main',
        height: '22px',
        pl: '2px',
        pr: '2px',
      }}
    />
  )
}
