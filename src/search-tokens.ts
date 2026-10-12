import { type Product } from './types.ts'

const normalize = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/\p{Diacritic}/gu, '')
    .replaceAll(/[^a-z0-9Ѐ-ӿ]+/giu, ' ')
    .trim()

export const tokenize = (s: string) => normalize(s).split(/\s+/).filter(Boolean)

export const buildItemTokens = (item: Product) => tokenize(`${item.sku} ${item.name} ${item.vendor}`)
