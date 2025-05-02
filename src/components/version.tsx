import { Box } from '@mui/material'

export const Version = () => {
  return (
    <Box
      component="span"
      sx={{
        color: 'text.secondary',
        position: 'absolute',
        fontSize: '10px',
        rotate: '-44deg',
        transform: 'translate(15px, 13px)',
      }}
    >
      {import.meta.env.VITE_TEST_VAR}
    </Box>
  )
}
