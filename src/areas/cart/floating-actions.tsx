import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Fab,
  Box,
} from '@mui/material'

import HdrStrongIcon from '@mui/icons-material/HdrStrong'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import BuildIcon from '@mui/icons-material/Build'
import PersonIcon from '@mui/icons-material/Person'
import DownloadIcon from '@mui/icons-material/Download'
import { SpeedDialProps } from '@mui/material/SpeedDial/SpeedDial'

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
      <Backdrop open={open} />

      <Box
        sx={{
          display: 'flex',

          ...(!wide && {
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: 'translate3d(0, 20px, 0)',
            position: 'absolute',
            left: '16px',
            right: '16px',
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

        <Fab color="secondary" size="small">
          <BuildIcon fontSize="small" />
        </Fab>
      </Box>
    </>
  )
}
