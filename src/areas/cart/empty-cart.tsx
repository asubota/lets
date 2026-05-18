import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Box, Button, Container, Typography } from '@mui/material'
import { createLink } from '@tanstack/react-router'

const LinkedButton = createLink(Button)

export const EmptyCart = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        textAlign: 'center',
      }}
    >
      <RemoveShoppingCartIcon sx={{ fontSize: '64px', color: 'text.secondary' }} />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Кошик порожній
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Час щось закинути, братан
        </Typography>
      </Box>
      <LinkedButton
        to="/list"
        variant="contained"
        startIcon={<DirectionsBikeIcon />}
        sx={{ mt: 1 }}
      >
        До каталогу
      </LinkedButton>
    </Container>
  )
}
