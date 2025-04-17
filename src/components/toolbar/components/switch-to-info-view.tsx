import InfoOutlineIcon from '@mui/icons-material/InfoOutline'
import { IconButton } from '@mui/material'
import { useAppActions, useAppView } from '../../../store'

export const SwitchToInfoView = () => {
  const view = useAppView()
  const { setView } = useAppActions()

  return (
    <IconButton
      size="small"
      sx={{
        color: view === 'info' ? 'primary.main' : 'text.secondary',
      }}
      onClick={() => setView('info')}
    >
      <InfoOutlineIcon />
    </IconButton>
  )
}
