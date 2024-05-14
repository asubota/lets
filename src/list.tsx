import { FC, useState } from 'react'
import {
  Box,
  Chip,
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
        rowGap: '12px',
        columnGap: '4px',
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: ` 
          "name name"
          "sku pricevendor"
        `,
      }}
    >
      <Box sx={{ gridArea: 'name', textAlign: 'left' }}>
        {getHighlightedText(p['name'], search)}
      </Box>

      <Box sx={{ gridArea: 'sku' }}>
        <Chip
          label={getHighlightedText(p['sku'], search)}
          color="secondary"
          size="small"
          variant="outlined"
        />
      </Box>

      <Box
        sx={{
          gridArea: 'pricevendor',
          display: 'flex',
          justifyContent: 'end',
          gap: '12px',
        }}
      >
        <Typography component="span" variant="body2" color="secondary">
          <Chip
            label={p['price']}
            color="secondary"
            size="small"
            variant="outlined"
          />
        </Typography>
        <Typography component="span" variant="body2" color="secondary">
          {p['vendor'] !== 'base' && (
            <Chip
              label={p['vendor']}
              color="secondary"
              size="small"
              variant="outlined"
            />
          )}

          {p['vendor'] === 'base' && (
            <Chip label={p['vendor']} color="primary" size="small" />
          )}
        </Typography>
        <Typography component="span" variant="body2" color="secondary">
          <Chip
            label={p['stock']}
            color="secondary"
            size="small"
            variant="outlined"
          />
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
            <Block p={row} search={search} key={row['sku'] + row['vendor']} />
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
                <TableCell align="right">Кількість</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row['sku'] + row['vendor']}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {getHighlightedText(row['sku'], search)}
                  </TableCell>
                  <TableCell align="right">{row['price']}</TableCell>
                  <TableCell>
                    {getHighlightedText(row['name'], search)}
                  </TableCell>
                  <TableCell align="right">
                    {row['vendor'] === 'base' ? (
                      <Chip
                        label={row['vendor']}
                        color="primary"
                        size="small"
                      />
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
      )}
    </>
  )
}
