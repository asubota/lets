import {
  Box,
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
    <TableContainer 
      className="glass-panel"
      sx={{ 
        borderRadius: '24px',
        border: 'none',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.4)',
        boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 4px 20px rgba(15, 23, 42, 0.05)',
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.includes('sku') && (
              <TableCell sx={{ pl: 2, py: 2, fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '13px', color: 'text.secondary' }}>
                Код
              </TableCell>
            )}
            {columns.includes('stock') && (
              <TableCell
                sx={{
                  pl: 1,
                  pr: 1,
                  py: 2,
                  whiteSpace: 'nowrap',
                  fontWeight: 800,
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '13px',
                  color: 'text.secondary',
                }}
                align="center"
              >
                Є?
              </TableCell>
            )}
            {columns.includes('name') && (
              <TableCell sx={{ pl: 1, py: 2 }}>
                <TableSortLabel
                  active={field === 'name'}
                  direction={field === 'name' ? order : 'asc'}
                  onClick={() => toggleSort('name')}
                  sx={{
                    'fontFamily': '"Outfit", sans-serif',
                    'fontWeight': 800,
                    'fontSize': '13px',
                    '&.Mui-active': { color: 'primary.main' },
                    '&.Mui-active .MuiTableSortLabel-icon': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Шо за річ
                </TableSortLabel>
              </TableCell>
            )}
            {columns.includes('vendor') && (
              <TableCell sx={{ pr: 1, py: 2, fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '13px', color: 'text.secondary' }} align="right">
                Барига
              </TableCell>
            )}
            {columns.includes('price') && (
              <TableCell sx={{ pr: 2, py: 2 }} align="right">
                <TableSortLabel
                  active={field === 'price'}
                  direction={field === 'price' ? order : 'asc'}
                  onClick={() => toggleSort('price')}
                  sx={{
                    'fontFamily': '"Outfit", sans-serif',
                    'fontWeight': 800,
                    'fontSize': '13px',
                    '&.Mui-active': { color: 'primary.main' },
                    '&.Mui-active .MuiTableSortLabel-icon': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Лаве
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
                'transition': 'background-color 0.2s',
                '&:hover': { 
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' 
                },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              {columns.includes('sku') && (
                <TableCell
                  sx={{ 
                    whiteSpace: 'nowrap', 
                    pr: 0, 
                    pl: 2,
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: 'text.secondary'
                  }}
                  onClick={async (e) => {
                    e.stopPropagation()
                    await copyContent(row.sku)
                  }}
                >
                  <RippleText text={getHighlightedText(row['sku'], search)} />
                </TableCell>
              )}

              {columns.includes('stock') && (
                <TableCell sx={{ pl: 1, pr: 1 }} align="center">
                  <Stock stock={row['stock']} />
                </TableCell>
              )}

              {columns.includes('name') && (
                <TableCell
                  sx={{ 
                    pl: 1,
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: 1.4
                  }}
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
                <TableCell 
                  sx={{ 
                    pl: 0, 
                    pr: 2,
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: '15px'
                  }} 
                  align="right"
                >
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
