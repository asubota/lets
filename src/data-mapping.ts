import { type Product } from './types'

const parsePics = (rawPics: unknown): string[] | null => {
  if (Array.isArray(rawPics)) {
    return rawPics as string[]
  }
  if (typeof rawPics !== 'string') {
    return null
  }

  const trimmed = rawPics.trim()
  if (!trimmed) {
    return null
  }
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return trimmed.split(',').map((s) => s.trim())
  }

  try {
    return JSON.parse(trimmed) as string[]
  } catch {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((s) => s.trim().replaceAll(/^['"]|['"]$/g, ''))
  }
}

export const mapToProduct = (item: Record<string, unknown>): Product => {
  const pics = item.pics ? parsePics(item.pics) : null

  return {
    sku: typeof item.sku === 'string' ? item.sku : '',
    name: typeof item.name === 'string' ? item.name : '',
    vendor: typeof item.vendor === 'string' ? item.vendor : '',
    price: Number(item.price) || 0,
    price_old: item.price_old == null ? null : Number(item.price_old),
    p2: item.p2 == null ? null : Number(item.p2),
    stock: typeof item.stock === 'string' ? item.stock : null,
    pics: pics,
  }
}
