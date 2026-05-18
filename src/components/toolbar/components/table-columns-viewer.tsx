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
      title="Колонки"
      sx={{ ml: 'auto', color: 'text.secondary', borderRadius: '10px' }}
      onClick={toggleSettings}
      size="small"
    >
      <TuneIcon />
    </IconButton>
  )
}
