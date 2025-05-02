import { type FC, type ReactNode } from 'react'

import { Fade, Paper, Popper } from '@mui/material'

interface FadePopperProps {
  open: boolean
  anchorEl: Element | null
  children: ReactNode
  timeout?: number
}

export const FadePopper: FC<FadePopperProps> = ({
  open,
  anchorEl,
  children,
  timeout = 350,
}) => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={timeout}>
          <Paper elevation={4} sx={{ mt: 1 }}>
            {children}
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
