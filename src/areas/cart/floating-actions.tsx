import {
  Backdrop,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Fab,
} from '@mui/material'

import HdrStrongIcon from '@mui/icons-material/HdrStrong'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import BuildIcon from '@mui/icons-material/Build'
import PersonIcon from '@mui/icons-material/Person'
import DownloadIcon from '@mui/icons-material/Download'

export function FloatingActions() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Backdrop open={open} />

      <Box sx={{ transform: 'translateZ(0px)' }}>
        <Fab
          color="secondary"
          size="small"
          sx={{ position: 'absolute', bottom: 16, right: 0 }}
        >
          <BuildIcon fontSize="small" />
        </Fab>

        <SpeedDial
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          ariaLabel="Extra options"
          sx={{ position: 'absolute', bottom: 16, left: 0 }}
          icon={<SpeedDialIcon icon={<HdrStrongIcon fontSize="small" />} />}
          direction="right"
          FabProps={{ size: 'small' }}
        >
          <SpeedDialAction
            icon={<ClearIcon color="primary" />}
            tooltipTitle="Видалити корзину"
          />
          <SpeedDialAction
            icon={<DownloadIcon color="primary" />}
            tooltipTitle="Ескорт ;)"
          />
          <SpeedDialAction
            icon={<AddIcon color="primary" />}
            tooltipTitle="Нова корзина"
          />
          <SpeedDialAction
            icon={<PersonIcon color="primary" />}
            tooltipTitle="Деталі клієнта"
          />
        </SpeedDial>
      </Box>
    </>
  )
}
