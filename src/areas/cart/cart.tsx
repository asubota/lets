import { Box, IconButton } from '@mui/material'
import { FC } from 'react'
import { createLink } from '@tanstack/react-router'
import HomeIcon from '@mui/icons-material/Home'
const LinkedIconButton = createLink(IconButton)

export const Cart: FC = () => {
  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box>тут буде корзина покупця, скоро</Box>

      <LinkedIconButton to="/list" sx={{ mt: 4 }} size="large">
        <HomeIcon fontSize="large" color="primary" />
      </LinkedIconButton>
    </Box>
  )
}
