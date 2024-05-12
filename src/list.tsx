import { FC } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useSearch } from './use-data.ts'

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
  const data = useSearch(search)

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography component="span" color="secondary" variant="body2">
          Total: {data.length}
        </Typography>
      </Box>

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
                key={row['Артикул'] + row['Продавець']}
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
