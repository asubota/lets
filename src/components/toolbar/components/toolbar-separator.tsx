import { type FC } from 'react'

import { Box } from '@mui/material'

export const ToolbarSeparator: FC = () => {
  return (
    <Box
      sx={{
        height: '22px',
        width: '1px',
        backgroundColor: 'primary.main',
        ml: '2px',
        mr: '2px',
      }}
    />
  )
}
