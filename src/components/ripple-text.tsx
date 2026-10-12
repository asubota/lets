import { type ReactNode } from 'react'

import { ButtonBase } from '@mui/material'

export const RippleText = ({ text }: { text: ReactNode }) => {
  return (
    <ButtonBase
      component="span"
      sx={{
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {text}
    </ButtonBase>
  )
}
