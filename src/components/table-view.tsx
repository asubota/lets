import { FC } from 'react'
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Product } from '../types.ts'
import { getHighlightedText } from '../tools.tsx'

export const TableView: FC<{ list: Product[]; search: string }> = ({
  list,
  search,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Артикул</TableCell>
            <TableCell align="right">Ціна</TableCell>
            <TableCell>Назва</TableCell>
            <TableCell align="right">Продавець</TableCell>
            <TableCell align="right">Кількість</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row['sku'] + row['vendor']}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {getHighlightedText(row['sku'], search)}
              </TableCell>
              <TableCell align="right">{row['price']}</TableCell>
              <TableCell>{getHighlightedText(row['name'], search)}</TableCell>
              <TableCell align="right">
                {row['vendor'] === 'base' ? (
                  <Chip label={row['vendor']} color="primary" size="small" />
                ) : (
                  row['vendor']
                )}
              </TableCell>
              <TableCell align="right">{row['stock']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
