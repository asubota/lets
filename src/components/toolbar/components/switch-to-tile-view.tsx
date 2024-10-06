import GridViewIcon from '@mui/icons-material/GridView'
import { IconButton } from '@mui/material'
import { FC } from 'react'
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
