import { Box, ButtonGroup, Stack } from '@mui/material'

import { Sorting } from '../sorting.tsx'
import { ExportButton } from './components/export-button.tsx'
import { ResultCounterAndFilter } from './components/result-counter-and-filter.tsx'
import { SearchOptions } from './components/search-options.tsx'
import { SearchOptions2 } from './components/search-options2.tsx'
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
}

interface ToolbarProps extends SharedToolbarProps {
  total: number
  uniqueVendors: string[]
  filteredSearch: boolean
  min: number
  max: number
}

export const Toolbar = ({
  total,
  uniqueVendors,
  filteredSearch,
  min,
  max,
  hasFavoritesSorting = false,
  hasPasteIn = false,
  hasGoogle = false,
  hasColumnsConfig = false,
}: ToolbarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '40px',
      }}
    >
      <Box sx={{ mr: 'auto', display: 'flex' }}>
        <ResultCounterAndFilter filteredSearch={filteredSearch} total={total} uniqueVendors={uniqueVendors} />

        <ExportButton />
      </Box>

      <Box sx={{ ml: 'auto', display: 'flex' }}>
        <Stack direction="row" gap={1}>
          <SearchOptions2 min={min} max={max} />
          <SearchOptions min={min} max={max} />
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
