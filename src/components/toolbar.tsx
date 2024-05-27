import { Box, ButtonGroup, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import { useAppActions, useAppView, useTableActions } from '../store'
import GridViewIcon from '@mui/icons-material/GridView'
import ReorderIcon from '@mui/icons-material/Reorder'
import TroubleshootIcon from '@mui/icons-material/Troubleshoot'
import { useSearchActions } from '../store/search.ts'
import TuneIcon from '@mui/icons-material/Tune'

interface ToolbarProps {
  total: number
  uniqueVendors: string[]
}

export const Toolbar: FC<ToolbarProps> = ({ total, uniqueVendors }) => {
  const view = useAppView()
  const { setView } = useAppActions()
  const { toggleSettings } = useTableActions()
  const { toggleLimitModal } = useSearchActions()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '50px',
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

      <IconButton
        sx={{ mr: 'auto', ml: 1 }}
        onClick={toggleLimitModal}
        size="small"
        color="secondary"
        disabled={uniqueVendors.length < 2}
      >
        <TroubleshootIcon />
      </IconButton>

      {view === 'table' && (
        <IconButton
          sx={{ ml: 'auto' }}
          onClick={toggleSettings}
          size="small"
          color="secondary"
        >
          <TuneIcon />
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
    </Box>
  )
}
