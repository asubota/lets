import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'

import { useTableColumns } from '../store'
import { useAppliedFiltersActions, useSortConfig } from '../store/appliedFilters.ts'
import { copyContent, getFavoriteId, getHighlightedText } from '../tools.tsx'
import { type Product } from '../types.ts'
import { AllColumnsAreDisabled } from './all-columns-are-disabled.tsx'
import { RippleText } from './ripple-text.tsx'
import { Stock } from './stock'
import { VendorChip } from './vendor-chip.tsx'
import { useInfiniteScroll } from '../hooks/use-infinite-scroll.ts'

const TableView = ({ list, search }: { list: Product[]; search: string }) => {
  const { field, order } = useSortConfig()
  const { toggleSort } = useAppliedFiltersActions()
  const columns = useTableColumns()

  const { visibleList, hasMore, loadMoreRef } = useInfiniteScroll(list)

  if (!columns.length) {
    return <AllColumnsAreDisabled />
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.includes('sku') && <TableCell sx={{ pl: 1 }}>Артикул</TableCell>}
            {columns.includes('stock') && (
              <TableCell
                sx={{
                  pl: 1,
                  pr: 0,
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  fontSize: '14px',
                }}
                align="center"
              >
                К-ть
              </TableCell>
            )}
            {columns.includes('name') && (
              <TableCell sx={{ pl: 1 }}>
                <TableSortLabel
                  active={field === 'name'}
                  direction={field === 'name' ? order : 'asc'}
                  onClick={() => toggleSort('name')}
                  sx={{
                    '&.Mui-active .MuiTableSortLabel-icon': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Назва
                </TableSortLabel>
              </TableCell>
            )}
            {columns.includes('vendor') && (
              <TableCell sx={{ pr: 1 }} align="right">
                Продавець
              </TableCell>
            )}
            {columns.includes('price') && (
              <TableCell sx={{ pr: 1 }} align="right">
                <TableSortLabel
                  active={field === 'price'}
                  direction={field === 'price' ? order : 'asc'}
                  onClick={() => toggleSort('price')}
                  sx={{
                    '&.Mui-active .MuiTableSortLabel-icon': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Ціна
                </TableSortLabel>
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody className="t-body">
          {visibleList.map((row) => (
            <TableRow
              key={getFavoriteId(row)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              {columns.includes('sku') && (
                <TableCell
                  sx={{ whiteSpace: 'nowrap', pr: 0, pl: 1 }}
                  onClick={async (e) => {
                    e.stopPropagation()
                    await copyContent(row.sku)
                  }}
                >
                  <RippleText text={getHighlightedText(row['sku'], search)} />
                </TableCell>
              )}

              {columns.includes('stock') && (
                <TableCell sx={{ pl: 1, pr: 0 }} align="center">
                  <Stock stock={row['stock']} />
                </TableCell>
              )}

              {columns.includes('name') && (
                <TableCell
                  sx={{ pl: 1 }}
                  onClick={async (e) => {
                    e.stopPropagation()
                    await copyContent(row.name)
                  }}
                >
                  <RippleText text={getHighlightedText(row['name'], search)} />
                </TableCell>
              )}

              {columns.includes('vendor') && (
                <TableCell align="right" sx={{ pr: 1 }}>
                  <VendorChip vendor={row.vendor} />
                </TableCell>
              )}

              {columns.includes('price') && (
                <TableCell sx={{ pl: 0, pr: 1 }} align="right">
                  {row['price']}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {hasMore && <Box ref={loadMoreRef} sx={{ p: 1 }} />}
    </TableContainer>
  )
}

export default TableView
