import { type PropsWithChildren } from 'react'

import HouseIcon from '@mui/icons-material/House'
import { Box, Button } from '@mui/material'
import { createLink } from '@tanstack/react-router'

const LinkedButton = createLink(Button)

export const TopBottomHome = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, pb: 2 }}>
        <LinkedButton
          to="/list"
          fullWidth
          variant="contained"
          color="secondary"
        >
          <HouseIcon color="primary" />
        </LinkedButton>
      </Box>

      <Box sx={{ flexGrow: 1 }}>{children}</Box>

      <Box sx={{ p: 3, pt: 2 }}>
        <LinkedButton to="/list" fullWidth variant="contained">
          <HouseIcon color="secondary" />
        </LinkedButton>
      </Box>
    </Box>
  )
}
