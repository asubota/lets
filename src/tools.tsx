import { Typography } from '@mui/material'
import { AppMessagePush, NotificationData, Product } from './types.ts'
import html2canvas from 'html2canvas'
import { MinMax } from './hooks/use-get-min-max-by-sku.ts'

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

export const handleTakeScreenshot = async () => {
  const el = document.getElementById('tiles-view')

  if (!el) {
    return
  }

  const canvas = await html2canvas(el, {
    ignoreElements(element) {
      return element.hasAttribute('data-no-export')
    },
    onclone(_: Document, element: HTMLElement) {
      const checked = element.querySelectorAll('input:checked')

      if (checked.length > 0) {
        const selector = '.product-tile:not(:has(input:checked))'
        const unselected = element.querySelectorAll<HTMLDivElement>(selector)
        unselected.forEach((el) => {
          el.remove()
        })
      }

      element
        .querySelectorAll<HTMLDivElement>('.product-tile')
        .forEach((el) => {
          el.style.borderColor = 'rgba(0, 0, 0, 0.12)'
        })

      element.style.padding = '6px'
    },
  })
  const imgData = canvas.toDataURL('image/png', 1.0)
  const link = document.createElement('a')

  link.href = imgData
  link.download = 'screenshot.png'
  link.click()
}

const isMessage = (
  item: Record<string, unknown> | undefined,
): item is AppMessagePush => !!item

export const getMessages = (
  products: Product[],
  minmax: MinMax,
): AppMessagePush[] => {
  return products
    .map((p) => {
      const stock = parseInt(p.stock || '', 10)
      const min = minmax[p.sku].min
      const max = minmax[p.sku].max

      const data: NotificationData = { sku: p.sku }
      const result: AppMessagePush[] = []

      if (min !== undefined && stock <= min) {
        const message: AppMessagePush = {
          type: 'push-me' as const,
          payload: {
            title: p.name,
            options: {
              body: `${p.sku}, цього ${stock}, менше ніж ${min}`,
              icon: '/lets/logo.webp',
              data,
            },
          },
        }

        result.push(message)
      }

      if (max !== undefined && stock >= max) {
        const message: AppMessagePush = {
          type: 'push-me' as const,
          payload: {
            title: p.name,
            options: {
              body: `${p.sku}, цього ${stock}, більше ніж ${max}`,
              icon: '/lets/logo.webp',
              data,
            },
          },
        }

        result.push(message)
      }

      return result
    })
    .flat()
    .filter(isMessage)
}

export const getFavoriteId = (p: Product) => `${p.sku}:${p.vendor}`

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  return date.toLocaleString('en-US', options).replace(',', '')
}

export function compareByTime(
  a: { time: number },
  b: { time: number },
): number {
  if (a.time < b.time) {
    return -1
  }
  if (a.time > b.time) {
    return 1
  }
  return 0
}
