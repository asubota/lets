import { useState } from 'react'

import HouseIcon from '@mui/icons-material/House'
import {
  Box,
  Button,
  DialogActions,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { createLink, useNavigate } from '@tanstack/react-router'
import { CirclePicker, HuePicker, type ColorChangeHandler } from 'react-color'

import { useSetColors } from '../../api-colors.ts'
import { Modal } from '../../components/modal.tsx'
import { VendorChip } from '../../components/vendor-chip.tsx'
import { type Color } from '../../types.ts'

const LinkedButton = createLink(Button)

export const ColorSettingsModal = ({
  vendors,
  colors: currentColors,
}: {
  vendors: string[]
  colors: Record<string, Color>
}) => {
  const navigate = useNavigate()
  const { mutate } = useSetColors()
  const [colors, setColors] = useState(currentColors)

  const [color, setColor] = useState('')
  const [activeVendor, setActiveVendor] = useState<string | null>(null)
  const [fill, setFill] = useState<'color' | 'borderColor' | 'both' | 'bg'>(
    'both',
  )

  const handleSetColor: ColorChangeHandler = ({ hex }) => {
    if (!activeVendor) {
      return
    }

    const data = { ...colors[activeVendor] }

    switch (fill) {
      case 'both':
        data.color = hex
        data.borderColor = hex
        break
      case 'color':
        data.color = hex
        break
      case 'bg':
        data.backgroundColor = hex
        break
      case 'borderColor':
        data.borderColor = hex
        break
      default:
        break
    }

    setColor(hex)
    setColors((value) => ({ ...value, [activeVendor]: data }))
  }

  const handleVendorChange = (vendor: string) => {
    setActiveVendor(vendor)
    setColor('')
  }

  const handleResetColor = () => {
    if (activeVendor) {
      setColors(({ [activeVendor]: _, ...value }) => value)
    }
  }

  const handleSave = () => {
    mutate({ currentColors, colors })
    return navigate({ to: '/list' })
  }

  const handleClose = () => navigate({ to: '/list' })

  const handleFillChange = (_: unknown, nextView: typeof fill) => {
    if (nextView !== null) {
      setFill(nextView)
    }
  }

  return (
    <Modal
      open
      title=""
      onSave={handleSave}
      onClose={handleClose}
      actions={
        <DialogActions
          sx={{
            p: 0,
            position: 'absolute',
            bottom: '30px',
            left: 0,
            width: '100%',
          }}
        >
          <Box sx={{ p: 3, width: '100%' }}>
            <LinkedButton to="/list" fullWidth variant="contained">
              <HouseIcon color="secondary" />
            </LinkedButton>
          </Box>
        </DialogActions>
      }
    >
      <Box
        sx={{
          mt: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <HuePicker color={color} onChange={handleSetColor} />
        <CirclePicker color={color} onChange={handleSetColor} />

        <Stack
          direction="row"
          sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
        >
          {activeVendor && (
            <VendorChip
              source="preview"
              vendor={activeVendor}
              color={colors[activeVendor]?.color}
              borderColor={colors[activeVendor]?.borderColor}
              backgroundColor={colors[activeVendor]?.backgroundColor}
            />
          )}

          <Button variant="contained" size="small" onClick={handleResetColor}>
            reset
          </Button>
        </Stack>

        <ToggleButtonGroup
          exclusive
          value={fill}
          onChange={handleFillChange}
          size="small"
        >
          <ToggleButton
            size="small"
            value="both"
            sx={{ textTransform: 'none' }}
          >
            text + border
          </ToggleButton>
          <ToggleButton
            size="small"
            value="color"
            sx={{ textTransform: 'none' }}
          >
            text
          </ToggleButton>
          <ToggleButton
            size="small"
            value="borderColor"
            sx={{ textTransform: 'none' }}
          >
            border
          </ToggleButton>
          <ToggleButton size="small" value="bg" sx={{ textTransform: 'none' }}>
            fill
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          gap: '10px',
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          mt: '40px',
          maxWidth: '300px',
          alignSelf: 'center',
        }}
      >
        {vendors.map((vendor) => {
          return (
            <Box
              key={vendor}
              onClick={() => handleVendorChange(vendor)}
              sx={{ cursor: 'pointer' }}
            >
              <VendorChip
                source="preview"
                vendor={vendor}
                color={colors[vendor]?.color}
                borderColor={colors[vendor]?.borderColor}
                backgroundColor={colors[vendor]?.backgroundColor}
              />
            </Box>
          )
        })}
      </Box>
    </Modal>
  )
}
