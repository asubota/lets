import { type FC, type ReactNode } from 'react'

import { ButtonBase } from '@mui/material'

export const RippleText: FC<{ text: ReactNode }> = ({ text }) => {
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
