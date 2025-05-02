import { type FC } from 'react'

import TuneIcon from '@mui/icons-material/Tune'
import { IconButton } from '@mui/material'

import { useAppView, useTableActions } from '../../../store'

export const TableColumnsViewer: FC = () => {
  const view = useAppView()
  const { toggleSettings } = useTableActions()

  if (view !== 'table') {
    return null
  }

  return (
    <IconButton
      sx={{ ml: 'auto', color: 'text.secondary' }}
      onClick={toggleSettings}
      size="small"
    >
      <TuneIcon />
    </IconButton>
  )
}
