import { Box } from '@mui/material'
import { FC, ReactNode, useId } from 'react'

export const HiddenInput: FC<{ children: ReactNode }> = ({ children }) => {
  const id = useId()

  return (
    <Box
      component="label"
      htmlFor={id}
      sx={{ m: 0, p: 0, fontSize: 0, cursor: 'pointer', userSelect: 'none' }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <Box id={id} component="input" type="checkbox" sx={{ display: 'none' }} />
    </Box>
  )
}
