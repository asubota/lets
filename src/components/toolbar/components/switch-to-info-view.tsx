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
        'color': view === 'info' ? 'primary.main' : 'text.secondary',
        'backgroundColor': view === 'info' ? 'rgba(234, 43, 6, 0.08)' : 'transparent',
        'borderRadius': '10px',
        '&:hover': {
          backgroundColor: view === 'info' ? 'rgba(234, 43, 6, 0.12)' : 'rgba(0,0,0,0.04)',
        },
      }}
      onClick={() => setView('info')}
    >
      <InfoOutlineIcon sx={{ fontSize: '20px' }} />
    </IconButton>
  )
}
