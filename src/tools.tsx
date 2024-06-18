import { Typography } from '@mui/material'
import { Product } from './types.ts'

const escapeRegExp = (value = ''): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

interface HighlightOptions {
  match?: Record<string, string | Record<string, string>>
  noMatch?: Record<string, string | Record<string, string>>
}

export function getHighlightedText(
  text: string | null,
  highlight: string,
  options: HighlightOptions = {
    match: {
      sx: {
        color: 'primary.main',
        fontWeight: 'bold',
      },
    },
    noMatch: {},
  },
) {
  if (text === null) {
    return text
  }

  const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, 'gi'))

  return (
    <>
      {parts.map((part, i) => (
        <Typography
          component="span"
          key={i}
          {...(part.toLowerCase() === highlight.toLowerCase()
            ? options.match
            : options.noMatch)}
        >
          {part}
        </Typography>
      ))}
    </>
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

export async function copyContent(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
