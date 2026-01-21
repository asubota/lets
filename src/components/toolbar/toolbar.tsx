import { Box, ButtonGroup, Stack } from '@mui/material'

import { Sorting } from '../sorting.tsx'
import { AppliedFiltersButton } from './components/applied-filters-button.tsx'
import { ExportButton } from './components/export-button.tsx'
import { SwitchToInfoView } from './components/switch-to-info-view.tsx'
import { SwitchToTableView } from './components/switch-to-table-view.tsx'
import { SwitchToTileView } from './components/switch-to-tile-view.tsx'
import { TableColumnsViewer } from './components/table-columns-viewer.tsx'
import { ToolbarSeparator } from './components/toolbar-separator.tsx'
import { GoogleButton } from './google-button.tsx'
import { PasteInSearchButton } from './paste-in-search-button.tsx'

export interface SharedToolbarProps {
  hasFavoritesSorting?: boolean
  hasPasteIn?: boolean
  hasGoogle?: boolean
  hasColumnsConfig?: boolean
  hasAppliedFilters?: boolean
}

interface ToolbarProps extends SharedToolbarProps {
  total: number
  uniqueVendors: string[]
  filteredSearch: boolean
}

export const Toolbar = ({
  hasFavoritesSorting = false,
  hasPasteIn = false,
  hasGoogle = false,
  hasColumnsConfig = false,
  hasAppliedFilters = false,
}: ToolbarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '40px',
      }}
    >
      <Box sx={{ mr: 'auto', display: 'flex', columnGap: 1 }}>
        {hasAppliedFilters && <AppliedFiltersButton />}
        <ExportButton />
      </Box>

      <Box sx={{ ml: 'auto', display: 'flex' }}>
        <Stack direction="row" gap={1}>
          {hasFavoritesSorting && <Sorting />}
          {hasPasteIn && <PasteInSearchButton size="small" />}
          {hasGoogle && <GoogleButton />}
          {hasColumnsConfig && <TableColumnsViewer />}
        </Stack>

        <ButtonGroup sx={{ alignItems: 'center' }}>
          <SwitchToTableView />
          <ToolbarSeparator />
          <SwitchToTileView />
          <ToolbarSeparator />
          <SwitchToInfoView />
        </ButtonGroup>
      </Box>
    </Box>
  )
}
