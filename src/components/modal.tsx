import React, { FC, PropsWithChildren, ReactNode } from 'react'
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type ModalProps = PropsWithChildren<{
  open: boolean
  onClose(): void
  title: string
  onSave(): void
  hasSave?: boolean
  actions?: ReactNode
}>

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  onSave,
  children,
  actions,
  hasSave = true,
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      slots={{ transition: Transition }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>

          {hasSave && (
            <Button autoFocus color="inherit" onClick={onSave}>
              Save
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {children}
      {actions}
    </Dialog>
  )
}
