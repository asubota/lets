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
        color: view === 'tile' ? 'primary.main' : 'text.secondary',
      }}
      onClick={() => setView('tile')}
    >
      <GridViewIcon />
    </IconButton>
  )
}
