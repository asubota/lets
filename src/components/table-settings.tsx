import React, { FC } from 'react'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slide,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

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

      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Артикул" />
          <FormControlLabel control={<Switch />} label="Кількість" />
          <FormControlLabel control={<Switch />} label="Назва" />
          <FormControlLabel control={<Switch />} label="Продавець" />
          <FormControlLabel control={<Switch />} label="Ціна" />
        </FormGroup>
      </Box>
    </Dialog>
  )
}
