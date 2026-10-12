import { type ReactNode } from 'react'

import { Typography } from '@mui/material'
import html2canvas from 'html2canvas'

import { type MinMax } from './hooks/use-get-min-max-by-sku.ts'
import { type FavNotification, type Product } from './types.ts'

const escapeRegExp = (value = ''): string => value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)

interface HighlightOptions {
  match?: Record<string, string | Record<string, string>>
  noMatch?: Record<string, string | Record<string, string>>
}

const DEFAULT_HIGHLIGHT_OPTIONS: HighlightOptions = {
  match: {
    sx: { color: 'primary.main', fontWeight: 'bold' },
  },
  noMatch: {},
}

// eslint-disable-next-line sonarjs/function-return-type -- ReactNode is a union by design
export function getHighlightedText(
  text: string | null,
  highlight: string | string[],
  options: HighlightOptions = DEFAULT_HIGHLIGHT_OPTIONS,
): ReactNode {
  if (text === null) {
    return null
  }

  const tokens = Array.isArray(highlight) ? highlight.filter(Boolean) : highlight.trim().split(/\s+/)

  if (tokens.length === 0) {
    return text
  }

  // eslint-disable-next-line security/detect-non-literal-regexp -- every token is escaped
  const regex = new RegExp(`(${tokens.map((token) => escapeRegExp(token)).join('|')})`, 'gi')

  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = tokens.some((t) => part.toLowerCase() === t.toLowerCase())
        return (
          <Typography component="span" key={index} {...(isMatch ? options.match : options.noMatch)}>
            {part}
          </Typography>
        )
      })}
    </>
  )
}

export function getUniqueVendors(list: Product[]): string[] {
  const vendorsSet = new Set<string>()
  for (const item of list) {
    vendorsSet.add(item.vendor)
  }
  return [...vendorsSet]
}

export const groupByVendor = (list: Product[]): Record<string, number> => {
  const counts: Record<string, number> = {}
  for (const item of list) {
    counts[item.vendor] = (counts[item.vendor] ?? 0) + 1
  }
  return counts
}

export async function copyContent(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const isNoExport = (element: Element) => element instanceof HTMLElement && Object.hasOwn(element.dataset, 'noExport')

export const handleTakeCartScreenshot = async () => {
  const element = document.querySelector<HTMLElement>('#cart')

  if (!element) {
    return
  }

  const canvas = await html2canvas(element, {
    ignoreElements: isNoExport,
    onclone(document_: Document, element: HTMLElement) {
      const root = document_.querySelector('#root')
      if (root) {
        element.style.backgroundImage = globalThis.getComputedStyle(root).getPropertyValue('background-image')
      }
      element.style.width = '400px'
      element.style.padding = '6px'
    },
  })
  const imgData = canvas.toDataURL('image/png', 1)
  const link = document.createElement('a')

  link.href = imgData
  link.download = 'screenshot.png'
  link.click()
}

export const handleTakeScreenshot = async () => {
  const element = document.querySelector<HTMLElement>('#tiles-view')

  if (!element) {
    return
  }

  const canvas = await html2canvas(element, {
    ignoreElements: isNoExport,
    onclone(_: Document, element: HTMLElement) {
      const checked = element.querySelectorAll('input:checked')

      if (checked.length > 0) {
        const selector = '.product-tile:not(:has(input:checked))'
        const unselected = element.querySelectorAll<HTMLDivElement>(selector)
        for (const element_ of unselected) {
          element_.remove()
        }
      }

      for (const element_ of element.querySelectorAll<HTMLDivElement>('.product-tile')) {
        element_.style.borderColor = 'rgba(0, 0, 0, 0.12)'
      }

      element.style.padding = '6px'
    },
  })
  const imgData = canvas.toDataURL('image/png', 1)
  const link = document.createElement('a')

  link.href = imgData
  link.download = 'screenshot.png'
  link.click()
}

export const getNotifications = (products: Product[], minmax: MinMax): FavNotification[] => {
  return products
    .filter((p) => p.vendor !== 'base')
    .flatMap((p) => {
      const limits = minmax[p.sku]
      if (!limits) {
        return []
      }

      const stock = Number.parseInt(p.stock ?? '', 10)
      const { min, max, read } = limits

      const result: FavNotification[] = []

      if (min !== undefined && stock <= min) {
        const notification: FavNotification = {
          title: p.name,
          body: `${p.sku} є ${stock}, менше ніж ${min}`,
          min,
          max,
          read,
          product: p,
          favoriteId: getFavoriteId(p),
        }

        result.push(notification)
      }

      if (max !== undefined && stock >= max) {
        const notification: FavNotification = {
          title: p.name,
          body: `${p.sku} є ${stock}, більше ніж ${max}`,
          min,
          max,
          read,
          product: p,
          favoriteId: getFavoriteId(p),
        }

        result.push(notification)
      }

      return result
    })
}

export const getFavoriteId = (p: Product) => `${p.sku}:${p.vendor}`

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')

  return `${day}.${month}`
}

export function compareByTime(a: { time: number }, b: { time: number }): number {
  if (a.time < b.time) {
    return 1
  }

  if (a.time > b.time) {
    return -1
  }

  return 0
}

export function compareByNoteAndTime(
  a: { note?: string | undefined; time: number },
  b: { note?: string | undefined; time: number },
): number {
  if (a.note === undefined && b.note !== undefined) {
    return 1
  }

  if (a.note !== undefined && b.note === undefined) {
    return -1
  }

  if (a.time > b.time) {
    return -1
  }

  if (a.time < b.time) {
    return 1
  }

  return 0
}

export const filterBySearch = (item: Product, search: string): boolean => {
  return item.sku.toLowerCase().includes(search) || item.name.toLowerCase().includes(search)
}

export const findProduct = (itemId: string, list: Product[]): Product | undefined => {
  const [sku, vendor] = itemId.split(':')
  return list.find((p) => p.sku === sku && p.vendor === vendor)
}
