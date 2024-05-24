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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTableActions, useTableColumns } from '../store'
import { Product } from '../types.ts'

function getTrueValues(obj: FormData) {
  return (Object.keys(obj) as (keyof FormData)[]).filter((key) => obj[key])
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} children={props.children} />
})

type FormData = {
  [key in keyof Product]: boolean
}

const allFalse = {
  sku: false,
  name: false,
  vendor: false,
  price: false,
  stock: false,
}

export const TableSettings: FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  const { setColumns } = useTableActions()
  const columns = useTableColumns()
  const values = columns.reduce((acc, key) => {
    acc[key] = true
    return acc
  }, allFalse as FormData)

  const { control, handleSubmit } = useForm<FormData>({ values })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setColumns(getTrueValues(data))
    handleClose()
  }

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
          <Button
            autoFocus
            color="inherit"
            onClick={(event) => void handleSubmit(onSubmit)(event)}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="form"
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <FormGroup>
          <Controller<FormData, 'sku'>
            name="sku"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={<Switch checked={value} onChange={onChange} />}
                label="Артикул"
              />
            )}
          />

          <Controller<FormData, 'stock'>
            name="stock"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={<Switch checked={value} onChange={onChange} />}
                label="Кількість"
              />
            )}
          />

          <Controller<FormData, 'name'>
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={<Switch checked={value} onChange={onChange} />}
                label="Назва"
              />
            )}
          />
          <Controller<FormData, 'vendor'>
            name="vendor"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={<Switch checked={value} onChange={onChange} />}
                label="Продавець"
              />
            )}
          />

          <Controller<FormData, 'price'>
            name="price"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={<Switch checked={value} onChange={onChange} />}
                label="Ціна"
              />
            )}
          />
        </FormGroup>
      </Box>
    </Dialog>
  )
}
