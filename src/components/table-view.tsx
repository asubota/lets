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
            <TableCell sx={{ pl: 1 }}>Артикул</TableCell>
            <TableCell sx={{ pl: 0, pr: 0 }} align="right">
              Кількість
            </TableCell>
            <TableCell>Назва</TableCell>
            <TableCell sx={{ pr: 0 }} align="right">
              Продавець
            </TableCell>
            <TableCell sx={{ pr: 1 }} align="right">
              Ціна
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="t-body">
          {list.map((row) => (
            <TableRow
              key={row['sku'] + row['vendor']}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ whiteSpace: 'nowrap', pr: 0, pl: 1 }}>
                {getHighlightedText(row['sku'], search)}
              </TableCell>

              <TableCell sx={{ pl: 0, pr: 0 }} align="right">
                {row['stock']}
              </TableCell>

              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {getHighlightedText(row['name'], search)}
              </TableCell>

              <TableCell align="right" sx={{ pr: 0 }}>
                {row['vendor'] === 'base' ? (
                  <Chip label={row['vendor']} color="primary" size="small" />
                ) : (
                  row['vendor']
                )}
              </TableCell>
              <TableCell sx={{ pl: 0, pr: 1 }} align="right">
                {row['price']}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
