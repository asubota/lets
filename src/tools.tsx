import { Typography } from '@mui/material'
import { Product } from './types.ts'

const escapeRegExp = (value = ''): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function getHighlightedText(text: string | null, highlight: string) {
  if (text === null) {
    return text
  }

  const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, 'gi'))

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

export const groupByVendor = (list: Product[]): Record<string, number> => {
  return list.reduce(
    (acc, item) => {
      acc[item.vendor] = (acc[item.vendor] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
}
