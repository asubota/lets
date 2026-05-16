import { type Product } from './types'

export const mapToProduct = (item: Record<string, unknown>): Product => {
  let pics: string[] | null = null
  const rawPics = item.pics
  if (rawPics) {
    if (Array.isArray(rawPics)) {
      pics = rawPics as string[]
    } else if (typeof rawPics === 'string') {
      const trimmed = rawPics.trim()
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          pics = JSON.parse(trimmed) as string[]
        } catch {
          pics = trimmed
            .slice(1, -1)
            .split(',')
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        }
      } else if (trimmed) {
        pics = trimmed.split(',').map((s) => s.trim())
      }
    }
  }

  return {
    sku: typeof item.sku === 'string' ? item.sku : '',
    name: typeof item.name === 'string' ? item.name : '',
    vendor: typeof item.vendor === 'string' ? item.vendor : '',
    price: Number(item.price) || 0,
    price_old: item.price_old != null ? Number(item.price_old) : null,
    p2: item.p2 != null ? Number(item.p2) : null,
    stock: typeof item.stock === 'string' ? item.stock : null,
    pics: pics,
  }
}
