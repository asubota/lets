import { type FC } from 'react'

import ReorderIcon from '@mui/icons-material/Reorder'
import { IconButton } from '@mui/material'

import { useAppActions, useAppView } from '../../../store'

export const SwitchToTableView: FC = () => {
  const view = useAppView()
  const { setView } = useAppActions()

  return (
    <IconButton
      size="small"
      sx={{
        color: view === 'table' ? 'primary.main' : 'text.secondary',
      }}
      onClick={() => setView('table')}
    >
      <ReorderIcon />
    </IconButton>
  )
}
