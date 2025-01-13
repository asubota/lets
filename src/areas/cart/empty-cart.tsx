import { FC } from 'react'
import { Box, Button, Container } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import HouseIcon from '@mui/icons-material/House'
import { createLink } from '@tanstack/react-router'

const LinkedButton = createLink(Button)

export const EmptyCart: FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          pt: '90px',
          color: 'text.secondary',
          typography: 'h4',
          textAlign: 'center',
        }}
      >
        <RemoveShoppingCartIcon
          sx={{ fontSize: '140px', color: 'text.secondary' }}
        />
      </Box>

      <LinkedButton
        to="/list"
        fullWidth
        variant="contained"
        sx={{ mb: '30px' }}
      >
        <HouseIcon color="secondary" />
      </LinkedButton>
    </Container>
  )
}
