import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Fab,
  Box,
  type SpeedDialProps,
} from '@mui/material'

import HdrStrongIcon from '@mui/icons-material/HdrStrong'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import BuildIcon from '@mui/icons-material/Build'
import PersonIcon from '@mui/icons-material/Person'
import DownloadIcon from '@mui/icons-material/Download'
import { handleTakeCartScreenshot } from '../../tools.tsx'
import { createLink } from '@tanstack/react-router'

const LinkedFab = createLink(Fab)

export function FloatingActions({
  direction,
  wide,
}: {
  wide: boolean
  direction: SpeedDialProps['direction']
}) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Backdrop open={open} data-no-export />

      <Box
        data-no-export
        sx={{
          display: 'flex',

          ...(!wide && {
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: 'translate3d(0, -45px, 0)',
            position: 'absolute',
            left: '24px',
            right: '24px',
          }),
          ...(wide && {
            justifyContent: 'flex-end',
          }),
        }}
      >
        <SpeedDial
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          ariaLabel="Extra options"
          icon={<SpeedDialIcon icon={<HdrStrongIcon fontSize="small" />} />}
          direction={direction}
          FabProps={{ size: 'small' }}
          sx={{ '& .MuiSpeedDialAction-fab': { bgcolor: '#fff' } }}
        >
          <SpeedDialAction
            icon={<ClearIcon color="primary" />}
            slotProps={{ tooltip: { title: 'Видалити корзину' } }}
          />
          <SpeedDialAction
            icon={<DownloadIcon color="primary" />}
            slotProps={{ tooltip: { title: 'Ескорт ;)' } }}
            onClick={handleTakeCartScreenshot}
          />
          <SpeedDialAction
            icon={<AddIcon color="primary" />}
            slotProps={{ tooltip: { title: 'Нова корзина' } }}
          />
          <SpeedDialAction
            icon={<PersonIcon color="primary" />}
            slotProps={{ tooltip: { title: 'Деталі клієнта' } }}
          />
        </SpeedDial>

        <LinkedFab color="secondary" size="small" to="/cart/service">
          <BuildIcon fontSize="small" />
        </LinkedFab>
      </Box>
    </>
  )
}
