import { Box, ButtonGroup, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { useAppActions, useAppView, useTableActions } from '../store'
import GridViewIcon from '@mui/icons-material/GridView'
import ReorderIcon from '@mui/icons-material/Reorder'

interface ToolbarProps {
  total: number
}

export const Toolbar: FC<ToolbarProps> = ({ total }) => {
  const view = useAppView()
  const { setView } = useAppActions()
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

      <ButtonGroup sx={{ alignItems: 'center' }}>
        <IconButton
          size="small"
          color={view === 'table' ? 'primary' : 'secondary'}
          onClick={() => setView('table')}
        >
          <ReorderIcon />
        </IconButton>
        <Box
          sx={{
            borderRight: '1px solid',
            borderColor: 'primary.main',
            height: '26px',
          }}
        />
        <IconButton
          size="small"
          color={view === 'tile' ? 'primary' : 'secondary'}
          onClick={() => setView('tile')}
        >
          <GridViewIcon />
        </IconButton>
      </ButtonGroup>

      {/*<Switch checked={view === 'table'} onChange={toggleView} />*/}
    </Box>
  )
}
