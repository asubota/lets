import { FC, useState } from 'react'
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { Product } from '../types.ts'
import { getHighlightedText } from '../tools.tsx'
import { useTableColumns } from '../store'
import { Stock } from './Stock.tsx'

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
    return (
      <Box sx={{ p: 1, textAlign: 'center', mt: '100px' }}>
        <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
          All columns are disabled!
        </Typography>
      </Box>
    )
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
              key={row['sku'] + row['vendor']}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.includes('sku') && (
                <TableCell sx={{ whiteSpace: 'nowrap', pr: 0, pl: 1 }}>
                  {getHighlightedText(row['sku'], search)}
                </TableCell>
              )}

              {columns.includes('stock') && (
                <TableCell sx={{ pl: 1, pr: 0 }} align="center">
                  <Stock stock={row['stock']} />
                </TableCell>
              )}

              {columns.includes('name') && (
                <TableCell sx={{ whiteSpace: 'nowrap', pl: 1 }}>
                  {getHighlightedText(row['name'], search)}
                </TableCell>
              )}

              {columns.includes('vendor') && (
                <TableCell align="right" sx={{ pr: 1 }}>
                  {row['vendor'] === 'base' ? (
                    <Chip label={row['vendor']} color="primary" size="small" />
                  ) : (
                    row['vendor']
                  )}
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
