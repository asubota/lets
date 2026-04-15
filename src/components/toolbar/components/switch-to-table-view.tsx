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
        'color': view === 'table' ? 'primary.main' : 'text.secondary',
        'backgroundColor': view === 'table' ? 'rgba(234, 43, 6, 0.08)' : 'transparent',
        'borderRadius': '10px',
        '&:hover': {
          backgroundColor: view === 'table' ? 'rgba(234, 43, 6, 0.12)' : 'rgba(0,0,0,0.04)',
        },
      }}
      onClick={() => setView('table')}
    >
      <ReorderIcon sx={{ fontSize: '20px' }} />
    </IconButton>
  )
}
