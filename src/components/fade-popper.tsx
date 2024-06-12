import { FC, ReactNode } from 'react'
import { Box, ClickAwayListener, Fade, Paper, Popper } from '@mui/material'
import { PopperOwnProps } from '@mui/base/Popper/Popper.types'
import { ClickAwayListenerProps } from '@mui/base/ClickAwayListener/ClickAwayListener'

interface FadePopperProps {
  open: boolean
  anchorEl: PopperOwnProps['anchorEl']
  children: ReactNode
  onClickAway: ClickAwayListenerProps['onClickAway']
  timeout?: number
}

export const FadePopper: FC<FadePopperProps> = ({
  open,
  anchorEl,
  children,
  onClickAway,
  timeout = 350,
}) => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={timeout}>
          <Paper elevation={4} sx={{ mt: 1 }}>
            <ClickAwayListener onClickAway={onClickAway}>
              <Box>{children}</Box>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
