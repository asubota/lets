import { Box } from '@mui/material'

export const Version = () => {
  return (
    <Box
      component="span"
      sx={{
        color: 'text.secondary',
        position: 'absolute',
        fontSize: '11px',
        fontWeight: 'bold',
        rotate: '-44deg',
        transform: 'translate(15px, 11px)',
      }}
    >
      {import.meta.env.VITE_TEST_VAR}
    </Box>
  )
}
