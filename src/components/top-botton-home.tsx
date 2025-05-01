import { createLink } from '@tanstack/react-router'
import { Box, Button } from '@mui/material'
import HouseIcon from '@mui/icons-material/House'
import { PropsWithChildren } from 'react'

const LinkedButton = createLink(Button)

export const TopBottomHome = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
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

      <Box sx={{ p: 3 }}>
        <LinkedButton to="/list" fullWidth variant="contained">
          <HouseIcon color="secondary" />
        </LinkedButton>
      </Box>
    </Box>
  )
}
