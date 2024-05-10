import { FC } from 'react'
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { findData } from './tools.ts'

function getHighlightedText(text: string | null, highlight: string) {
  if (text === null) {
    return text
  }

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Typography
            component="span"
            key={i}
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            {part}
          </Typography>
        ) : (
          <Typography component="span" key={i}>
            {part}
          </Typography>
        ),
      )}
    </span>
  )
}

export const List: FC<{ search: string }> = ({ search }) => {
  const data = findData(search)

  return (
    <>
      <Box>Total: {data.length}</Box>

      <Divider />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell align="right">Ціна</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell align="right">Продавець</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row['Артикул']}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {getHighlightedText(row['Артикул'], search)}
                </TableCell>
                <TableCell align="right">{row['Ціна']}</TableCell>
                <TableCell>
                  {getHighlightedText(row['Назва'], search)}
                </TableCell>
                <TableCell align="right">{row['Продавець']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
