import { Box, ButtonGroup, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import {
  useAppActions,
  useAppView,
  useShowFavs,
  useTableActions,
} from '../store'
import GridViewIcon from '@mui/icons-material/GridView'
import ReorderIcon from '@mui/icons-material/Reorder'
import TroubleshootIcon from '@mui/icons-material/Troubleshoot'
import { useSearchActions } from '../store/search.ts'
import TuneIcon from '@mui/icons-material/Tune'

interface ToolbarProps {
  total: number
  uniqueVendors: string[]
  filteredSearch: boolean
}

export const Toolbar: FC<ToolbarProps> = ({
  total,
  uniqueVendors,
  filteredSearch,
}) => {
  const view = useAppView()
  const { setView } = useAppActions()
  const { toggleSettings } = useTableActions()
  const { toggleLimitModal } = useSearchActions()
  const showFavs = useShowFavs()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '50px',
      }}
    >
      <Box
        sx={{
          mr: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={
          uniqueVendors.length < 2 || showFavs ? undefined : toggleLimitModal
        }
      >
        <IconButton
          size="small"
          color="secondary"
          disabled={uniqueVendors.length < 2}
          sx={{ position: 'relative' }}
        >
          <TroubleshootIcon />
          {filteredSearch && (
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '50%',
                width: '5px',
                height: '5px',
                position: 'absolute',
                right: '4px',
                top: '4px',
              }}
            />
          )}
        </IconButton>
        <Typography
          component="div"
          color="secondary"
          variant="body2"
          sx={{ fontWeight: 'bold' }}
        >
          {total}
        </Typography>
      </Box>

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

      <ButtonGroup sx={{ alignItems: 'center', mr: '3px' }}>
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
            height: '22px',
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
