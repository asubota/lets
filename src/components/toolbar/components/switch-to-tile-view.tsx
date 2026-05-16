import { type FC } from 'react'

import GridViewIcon from '@mui/icons-material/GridView'
import { IconButton } from '@mui/material'

import { useAppActions, useAppView } from '../../../store'

export const SwitchToTileView: FC = () => {
  const view = useAppView()
  const { setView } = useAppActions()

  return (
    <IconButton
      size="small"
      sx={{
        'color': view === 'tile' ? 'primary.main' : 'text.secondary',
        'backgroundColor': view === 'tile' ? 'rgba(234, 43, 6, 0.1)' : 'transparent',
        'border': view === 'tile' ? '1px solid rgba(234, 43, 6, 0.2)' : '1px solid transparent',
        'borderRadius': '10px',
        '&:hover': {
          backgroundColor: view === 'tile' ? 'rgba(234, 43, 6, 0.15)' : 'rgba(0,0,0,0.04)',
        },
      }}
      onClick={() => setView('tile')}
    >
      <GridViewIcon sx={{ fontSize: '20px' }} />
    </IconButton>
  )
}
