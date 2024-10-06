import { FC, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { Product } from '../types.ts'
import { copyContent, getFavoriteId, getHighlightedText } from '../tools.tsx'
import { useTableColumns } from '../store'
import { Stock } from './stock'
import { VendorChip } from './vendor-chip.tsx'
import { RippleText } from './ripple-text.tsx'
import { AllColumnsAreDisabled } from './all-columns-are-disabled.tsx'

type Order = 'asc' | 'desc' | undefined

function descendingComparator(a: Product, b: Product) {
  if (b.price < a.price) {
    return -1
  }
  if (b.price > a.price) {
    return 1
  }
  return 0
}

function getComparator(order: Order): (a: Product, b: Product) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b)
    : (a, b) => -descendingComparator(a, b)
}

export const TableView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  const [order, setOrder] = useState<Order>(undefined)
  const columns = useTableColumns()

  const handleOrderChange = () => {
    setOrder((o) => {
      if (!o) {
        return 'asc'
      }

      if (o === 'asc') {
        return 'desc'
      }

      return undefined
    })
  }

  if (!columns.length) {
    return <AllColumnsAreDisabled />
  }

  const sortedList = order ? list.slice().sort(getComparator(order)) : list

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.includes('sku') && (
              <TableCell sx={{ pl: 1 }}>Артикул</TableCell>
            )}
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
              <TableCell sx={{ pl: 1 }}>Назва</TableCell>
            )}
            {columns.includes('vendor') && (
              <TableCell sx={{ pr: 1 }} align="right">
                Продавець
              </TableCell>
            )}
            {columns.includes('price') && (
              <TableCell sx={{ pr: 1 }} align="right">
                <TableSortLabel
                  active={!!order}
                  direction={order}
                  onClick={handleOrderChange}
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
          {sortedList.map((row) => (
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
                  sx={{ whiteSpace: 'nowrap', pl: 1 }}
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
    </TableContainer>
  )
}
