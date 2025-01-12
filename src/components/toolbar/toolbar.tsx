import { Box, ButtonGroup } from '@mui/material'
import { FC } from 'react'
import { GoogleButton } from './google-button.tsx'
import { PasteInSearchButton } from './paste-in-search-button.tsx'
import { SwitchToTableView } from './components/switch-to-table-view.tsx'
import { ToolbarSeparator } from './components/toolbar-separator.tsx'
import { SwitchToTileView } from './components/switch-to-tile-view.tsx'
import { TableColumnsViewer } from './components/table-columns-viewer.tsx'
import { ExportButton } from './components/export-button.tsx'
import { ResultCounterAndFilter } from './components/result-counter-and-filter.tsx'
import { Sorting } from '../sorting.tsx'
import { CartButton } from './cart-button.tsx'

export interface SharedToolbarProps {
  hasFavoritesSorting?: boolean
  hasPasteIn?: boolean
  hasGoogle?: boolean
  hasColumnsConfig?: boolean
  hasCart?: boolean
}

interface ToolbarProps extends SharedToolbarProps {
  total: number
  uniqueVendors: string[]
  filteredSearch: boolean
}

export const Toolbar: FC<ToolbarProps> = ({
  total,
  uniqueVendors,
  filteredSearch,
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
        {hasCart && <CartButton />}
        {hasFavoritesSorting && <Sorting />}
        {hasPasteIn && <PasteInSearchButton />}
        {hasGoogle && <GoogleButton />}
        {hasColumnsConfig && <TableColumnsViewer />}

        <ButtonGroup sx={{ alignItems: 'center' }}>
          <SwitchToTableView />
          <ToolbarSeparator />
          <SwitchToTileView />
        </ButtonGroup>
      </Box>
    </Box>
  )
}
