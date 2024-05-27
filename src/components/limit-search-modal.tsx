import { Modal } from './modal.tsx'
import { FC } from 'react'
import { useSearchActions, useShowLimitModal } from '../store/search.ts'
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
  [key: string]: boolean
}

function getTrueValues(obj: FormData) {
  return Object.keys(obj).filter((key) => obj[key])
}

export const LimitSearchModal: FC<{ vendors: string[] }> = ({ vendors }) => {
  const { toggleLimitModal, setSearchVendors } = useSearchActions()
  const open = useShowLimitModal()

  const values = vendors.reduce((acc, key) => {
    acc[key] = true
    return acc
  }, {} as FormData)

  const { control, handleSubmit, setValue, getValues } = useForm({ values })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSearchVendors(getTrueValues(data))
    toggleLimitModal()
  }

  const setAll = (value: boolean) => {
    vendors.forEach((vendor) => setValue(vendor, value))
  }

  const handleToggleValues = () => {
    const selectedVendors = getTrueValues(getValues())

    if (selectedVendors.length < vendors.length) {
      setAll(true)
    }

    if (selectedVendors.length === vendors.length) {
      setAll(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={toggleLimitModal}
      title=""
      onSave={() => void handleSubmit(onSubmit)()}
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
            {vendors.map((vendor) => (
              <Controller
                key={vendor}
                name={vendor}
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label={vendor}
                      checked={field.value}
                    />
                  )
                }}
              />
            ))}
          </FormGroup>

          <Divider
            sx={{ mb: 2, mt: 1, width: '100%', borderColor: 'primary.main' }}
            orientation="horizontal"
          />
          <FormGroup sx={{ width: '100%' }}>
            <ButtonGroup
              variant="outlined"
              size="small"
              fullWidth
              color="primary"
            >
              <Button
                sx={{ textTransform: 'none' }}
                onClick={handleToggleValues}
              >
                Check / Uncheck
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Box>
      </Paper>
    </Modal>
  )
}
