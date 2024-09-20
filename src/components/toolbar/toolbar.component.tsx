import { Box, ButtonGroup, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import { useAppActions, useAppView, useTableActions } from '../../store'
import GridViewIcon from '@mui/icons-material/GridView'
import ReorderIcon from '@mui/icons-material/Reorder'
import TroubleshootIcon from '@mui/icons-material/Troubleshoot'
import { useSearchActions } from '../../store/search.ts'
import TuneIcon from '@mui/icons-material/Tune'
import IosShareIcon from '@mui/icons-material/IosShare'
import { handleTakeScreenshot } from '../../tools.tsx'
import { BookmarkButton } from './bookmark-button.tsx'
import { GoogleButton } from './google-button.tsx'
import { useIsRoute } from '../../hooks/use-is-route.hook.ts'
import { RedDot } from '../red-dot.tsx'

interface ToolbarProps {
  search: string
  total: number
  uniqueVendors: string[]
  filteredSearch: boolean
}

export const Toolbar: FC<ToolbarProps> = ({
  search,
  total,
  uniqueVendors,
  filteredSearch,
}) => {
  const view = useAppView()
  const { setView } = useAppActions()
  const { toggleSettings } = useTableActions()
  const { toggleLimitModal } = useSearchActions()
  const isMainRoute = useIsRoute('/')
  const fewVendorsAvailable = uniqueVendors.length > 1

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '40px',
      }}
    >
      <Box sx={{ mr: 'auto', display: 'flex' }}>
        <Box
          onClick={fewVendorsAvailable ? toggleLimitModal : undefined}
          sx={{ cursor: fewVendorsAvailable ? 'pointer' : 'default' }}
        >
          <IconButton
            size="small"
            disabled={uniqueVendors.length < 2}
            sx={{ position: 'relative', color: 'text.secondary' }}
          >
            <TroubleshootIcon />
            {filteredSearch && <RedDot />}
          </IconButton>
          <Typography
            component="span"
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: isMainRoute ? 'text.disabled' : 'text.secondary',
            }}
          >
            {total}
          </Typography>
        </Box>
        {view === 'tile' && (
          <IconButton
            sx={{ ml: '16px', color: 'text.secondary' }}
            size="small"
            onClick={handleTakeScreenshot}
          >
            <IosShareIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ ml: 'auto', display: 'flex' }}>
        {isMainRoute && <BookmarkButton search={search} />}
        {isMainRoute && <GoogleButton />}
        {isMainRoute && view === 'table' && (
          <IconButton
            sx={{ ml: 'auto', color: 'text.secondary' }}
            onClick={toggleSettings}
            size="small"
          >
            <TuneIcon />
          </IconButton>
        )}

        <ButtonGroup sx={{ alignItems: 'center', mr: '3px' }}>
          <IconButton
            size="small"
            sx={{
              color: view === 'table' ? 'primary.main' : 'text.secondary',
            }}
            onClick={() => setView('table')}
          >
            <ReorderIcon />
          </IconButton>
          <Box
            sx={{
              borderRight: '1px solid',
              borderColor: 'primary.main',
              height: '22px',
              pl: '2px',
              pr: '2px',
            }}
          />
          <IconButton
            size="small"
            sx={{
              color: view === 'tile' ? 'primary.main' : 'text.secondary',
            }}
            onClick={() => setView('tile')}
          >
            <GridViewIcon />
          </IconButton>
        </ButtonGroup>
      </Box>
    </Box>
  )
}
