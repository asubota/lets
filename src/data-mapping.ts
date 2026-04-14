import { type Product } from './types'

export const mapToProduct = (item: any): Product => {
  let pics: string[] | null = null
  if (item.pics) {
    if (Array.isArray(item.pics)) {
      pics = item.pics
    } else if (typeof item.pics === 'string') {
      const trimmed = item.pics.trim()
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          pics = JSON.parse(trimmed)
        } catch {
          pics = trimmed
            .slice(1, -1)
            .split(',')
            .map((s: string) => s.trim().replace(/^['"]|['"]$/g, ''))
        }
      } else if (trimmed) {
        pics = trimmed.split(',').map((s: string) => s.trim())
      }
    }
  }

  return {
    sku: item.sku || '',
    name: item.name || '',
    vendor: item.vendor || '',
    price: Number(item.price) || 0,
    price_old: item.price_old ? Number(item.price_old) : null,
    p2: item.p2 ? Number(item.p2) : null,
    stock: item.stock || null,
    pics: pics,
  }
}
