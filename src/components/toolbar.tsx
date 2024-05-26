import { Box, IconButton, Switch, Typography } from '@mui/material'
import { FC } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { useAppActions, useAppView } from '../store'
import { useTableSettings } from './use-table-settings.ts'

interface ToolbarProps {
  total: number
}

export const Toolbar: FC<ToolbarProps> = ({ total }) => {
  const view = useAppView()
  const { toggleView } = useAppActions()
  const { toggle } = useTableSettings()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pt: 1,
        pb: 1,
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
        <IconButton onClick={toggle}>
          <SettingsIcon />
        </IconButton>
      )}

      <Switch checked={view === 'table'} onChange={toggleView} />
    </Box>
  )
}
