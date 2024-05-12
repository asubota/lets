import { FC, useState } from 'react'
import {
  Box,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Product, useSearch } from './use-data.ts'

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

const Block: FC<{ p: Product; search: string }> = ({ p, search }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        p: 1,
        display: 'grid',
        gridGap: '4px',
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: ` 
          "name name"
          "sku pricevendor"
        `,
      }}
    >
      <Box sx={{ gridArea: 'name', textAlign: 'center' }}>
        {getHighlightedText(p['Назва'], search)}
      </Box>

      <Box sx={{ gridArea: 'sku' }}>
        {getHighlightedText(p['Артикул'], search)}
      </Box>

      <Box
        sx={{
          gridArea: 'pricevendor',
          display: 'flex',
          justifyContent: 'end',
          gap: 1,
        }}
      >
        <Typography
          component="span"
          variant="body2"
          color="secondary"
          textAlign="right"
        >
          {p['Ціна']}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          color="secondary"
          textAlign="right"
        >
          {p['Продавець']}
        </Typography>
      </Box>
    </Box>
  )
}

export const List: FC<{ search: string }> = ({ search }) => {
  const data = useSearch(search)
  const [value, setValue] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography component="span" color="secondary" variant="body2">
          Total: {data.length}
        </Typography>
      </Box>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              value={value}
              onChange={(_, checked) => setValue(checked)}
            />
          }
          label="view"
        />
      </FormGroup>

      {!value && (
        <Stack direction="column" spacing={1}>
          {data.map((row) => (
            <Block
              p={row}
              search={search}
              key={row['Артикул'] + row['Продавець']}
            />
          ))}
        </Stack>
      )}

      {value && (
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
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
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
      )}
    </>
  )
}
