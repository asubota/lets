import { Typography } from '@mui/material'
import { AppMessagePush, NotificationData, Product } from './types.ts'
import html2canvas from 'html2canvas'

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
  settings: Record<string, Record<string, string>>,
): AppMessagePush[] => {
  return products
    .filter((p) => p.sku in settings && !!p.stock)
    .map((p) => {
      const stock = parseInt(p.stock || '', 10)
      const min = parseInt(settings[p.sku].min, 10)
      const max = parseInt(settings[p.sku].max, 10)

      const data: NotificationData = { sku: p.sku }

      if (stock <= min) {
        const message: AppMessagePush = {
          type: 'push-me' as const,
          payload: {
            title: p.name,
            options: {
              body: `${p.sku}, цього менше ніж ${min}`,
              icon: '/lets/logo.webp',
              data,
            },
          },
        }

        return message
      }

      if (stock >= max) {
        const message: AppMessagePush = {
          type: 'push-me' as const,
          payload: {
            title: p.name,
            options: {
              body: `${p.sku}, цього більше ніж ${max}`,
              icon: '/lets/logo.webp',
              data,
            },
          },
        }

        return message
      }

      return undefined
    })
    .filter(isMessage)
}
