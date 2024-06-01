import { Modal } from './modal.tsx'
import { FC } from 'react'
import { useSearchActions, useShowLimitModal } from '../store/search.ts'
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  styled,
  Switch,
  Typography,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Product } from '../types.ts'
import { getUniqueVendors, groupByVendor } from '../tools.tsx'
import { clsx } from 'clsx'

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '&.intermediate .MuiSwitch-track': {
    backgroundColor: theme.palette.secondary.light,
  },

  '&.intermediate .MuiSwitch-switchBase': {
    transform: 'translateX(10px)',
  },

  '&.intermediate .MuiSwitch-thumb': {
    backgroundColor: theme.palette.primary.light,
  },
}))

type FormData = {
  [key: string]: boolean
}

function getTrueValues(obj: FormData) {
  return Object.keys(obj).filter((key) => obj[key])
}

export const LimitSearchModal: FC<{ list: Product[] }> = ({ list }) => {
  const vendors = getUniqueVendors(list)
  const countByVendor = groupByVendor(list)

  const { toggleLimitModal, setSearchVendors } = useSearchActions()
  const open = useShowLimitModal()

  const values = vendors.reduce((acc, key) => {
    acc[key] = true
    return acc
  }, {} as FormData)

  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    values,
  })

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

  const selectedVendors = getTrueValues(watch())

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
                      label={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{
                            textDecoration: field.value
                              ? 'none'
                              : 'line-through',
                          }}
                        >
                          {vendor} ({countByVendor[field.name]})
                        </Typography>
                      }
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
          <FormGroup sx={{ width: '100%', alignItems: 'center' }}>
            <StyledSwitch
              checked={selectedVendors.length === vendors.length}
              onClick={handleToggleValues}
              className={clsx({
                intermediate:
                  selectedVendors.length > 0 &&
                  selectedVendors.length < vendors.length,
              })}
            />
          </FormGroup>
        </Box>
      </Paper>
    </Modal>
  )
}
