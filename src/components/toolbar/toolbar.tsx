import { type FC } from 'react'

import { Box, ButtonGroup } from '@mui/material'

import { Sorting } from '../sorting.tsx'
import { CartButton } from './cart-button.tsx'
import { ExportButton } from './components/export-button.tsx'
import { ResultCounterAndFilter } from './components/result-counter-and-filter.tsx'
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
  hasCart?: boolean
}

interface ToolbarProps extends SharedToolbarProps {
  search: string
  total: number
  uniqueVendors: string[]
  filteredSearch: boolean
}

export const Toolbar: FC<ToolbarProps> = ({
  total,
  uniqueVendors,
  filteredSearch,
  search,
  hasFavoritesSorting = false,
  hasPasteIn = false,
  hasGoogle = false,
  hasColumnsConfig = false,
  hasCart = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '40px',
      }}
    >
      <Box sx={{ mr: 'auto', display: 'flex' }}>
        <ResultCounterAndFilter
          filteredSearch={filteredSearch}
          total={total}
          uniqueVendors={uniqueVendors}
        />

        <ExportButton />
      </Box>

      <Box sx={{ ml: 'auto', display: 'flex' }}>
        {hasCart && <CartButton search={search} />}
        {hasFavoritesSorting && <Sorting />}
        {hasPasteIn && <PasteInSearchButton size="small" />}
        {hasGoogle && <GoogleButton />}
        {hasColumnsConfig && <TableColumnsViewer />}

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
