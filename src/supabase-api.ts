import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './constants'
import { Product } from './types'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type FetchProgress = {
  loaded: number
  total: number
  percent: number
}

export const fetchProductsFromSupabase = async (
  onProgress?: (progress: FetchProgress) => void,
): Promise<Product[]> => {
  // 1. Отримуємо загальну кількість записів
  const { count, error: countError } = await supabase
    .from('active_products_snapshot')
    .select('*', { count: 'exact', head: true })

  if (countError) {
    console.warn('Could not fetch total count from Supabase:', countError)
  }

  const totalCount = count || 0
  let allData: any[] = []
  let from = 0
  const PAGE_SIZE = 1000

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  // 2. Завантажуємо дані пачками
  while (true) {
    const { data, error } = await supabase
      .from('active_products_snapshot')
      .select('sku, name, vendor, price, price_old, p2, stock, pics')
      .range(from, from + PAGE_SIZE - 1)
      .order('sku', { ascending: true })

    if (error) {
      console.error('Error fetching from Supabase:', error)
      throw error
    }

    if (!data || data.length === 0) {
      break
    }

    allData = allData.concat(data)

    // Звітуємо про прогрес
    if (onProgress && totalCount > 0) {
      onProgress({
        loaded: allData.length,
        total: totalCount,
        percent: Math.round((allData.length / totalCount) * 100),
      })
    }

    if (data.length < PAGE_SIZE) {
      break
    }

    from += PAGE_SIZE

    // Додаємо затримку між запитами
    await delay(200)
  }

  // 3. Мапимо дані в об'єкти Product
  return allData.map((item) => {
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
  })
}
