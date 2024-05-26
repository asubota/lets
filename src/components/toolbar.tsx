import { Box, IconButton, Switch, Typography } from '@mui/material'
import { FC } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { useAppActions, useAppView, useTableActions } from '../store'

interface ToolbarProps {
  total: number
}

export const Toolbar: FC<ToolbarProps> = ({ total }) => {
  const view = useAppView()
  const { toggleView } = useAppActions()
  const { toggleSettings } = useTableActions()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '58px',
      }}
    >
      <Typography
        component="div"
        color="secondary"
        variant="body2"
        sx={{ fontWeight: 'bold' }}
      >
        Total: {total}
      </Typography>

      {view === 'table' && (
        <IconButton onClick={toggleSettings}>
          <SettingsIcon />
        </IconButton>
      )}

      <Switch checked={view === 'table'} onChange={toggleView} />
    </Box>
  )
}
