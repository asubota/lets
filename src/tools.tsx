import { Typography } from '@mui/material'
import { Product } from './types.ts'

export function getHighlightedText(text: string | null, highlight: string) {
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

export function getUniqueVendors(list: Product[]): string[] {
  const vendorsSet = new Set<string>()
  list.forEach((item) => vendorsSet.add(item.vendor))
  return Array.from(vendorsSet)
}
