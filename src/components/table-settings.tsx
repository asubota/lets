import React, { FC } from 'react'
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
import { TransitionProps } from '@mui/material/transitions'

import EngineeringIcon from '@mui/icons-material/Engineering'
import HardwareIcon from '@mui/icons-material/Hardware'

import CloseIcon from '@mui/icons-material/Close'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} children={props.children} />
})

export const TableSettings: FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Table Columns
          </Typography>
          <Button autoFocus color="inherit">
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, textAlign: 'center' }}>in progress</Box>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-around',
        }}
      >
        <EngineeringIcon
          className="sizing"
          sx={{ fontSize: '140px' }}
          color="primary"
        />

        <HardwareIcon
          className="sizing"
          sx={{ fontSize: '80px' }}
          color="secondary"
        />
      </Box>
    </Dialog>
  )
}
