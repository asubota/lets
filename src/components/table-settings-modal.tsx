import { FC } from 'react'
import { Modal } from './modal.tsx'
import {
  useShowTableSettings,
  useTableActions,
  useTableColumns,
} from '../store'
import { Box, FormControlLabel, FormGroup, Paper, Switch } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Product } from '../types.ts'

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

function getTrueValues(obj: FormData) {
  return (Object.keys(obj) as (keyof FormData)[]).filter((key) => obj[key])
}

export const TableSettingsModal: FC = () => {
  const showTableSettings = useShowTableSettings()
  const { setColumns } = useTableActions()
  const { toggleSettings } = useTableActions()
  const columns = useTableColumns()
  const values = columns.reduce((acc, key) => {
    acc[key] = true
    return acc
  }, allFalse as FormData)
  const { control, handleSubmit } = useForm<FormData>({ values })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setColumns(getTrueValues(data))
    toggleSettings()
  }

  return (
    <Modal
      open={showTableSettings}
      onClose={toggleSettings}
      title=""
      onSave={() => handleSubmit(onSubmit)()}
    >
      <Paper elevation={2} sx={{ p: 3, m: 3 }}>
        <Box
          component="form"
          sx={{
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
      </Paper>
    </Modal>
  )
}
