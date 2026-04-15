import React, { type FC, type PropsWithChildren, type ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'
import { type Theme } from '@mui/material/styles'
import { type TransitionProps } from '@mui/material/transitions'

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
      PaperProps={{
        sx: {
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#020617' : '#f8fafc',
          backgroundImage: 'none',
        }
      }}
    >
      <AppBar 
        className="glass-panel"
        sx={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ 
              mr: 1,
              '&:hover': { backgroundColor: 'action.hover' }
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography 
            sx={{ 
              flex: 1, 
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.5px'
            }} 
            variant="h6" 
            component="div"
          >
            {title}
          </Typography>

          {hasSave && (
            <Button 
              autoFocus 
              color="primary" 
              variant="contained"
              onClick={onSave}
              sx={{ 
                borderRadius: '12px',
                px: 3,
                fontWeight: 700
              }}
            >
              Зберегти
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </Box>
      {actions && (
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid', 
          borderColor: 'divider',
          backgroundColor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(248, 250, 252, 0.5)',
          backdropFilter: 'blur(10px)'
        }}>
          {actions}
        </Box>
      )}
    </Dialog>
  )
}
