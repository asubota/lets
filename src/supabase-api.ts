import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './constants'
import { Product } from './types'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const fetchProductsFromSupabase = async (): Promise<Product[]> => {
  let allData: any[] = []
  let from = 0
  const PAGE_SIZE = 1000 // Supabase default limit is 1000

  while (true) {
    const { data, error } = await supabase
      .from('active_products_snapshot')
      .select('sku, name, vendor, price, price_old, p2, stock, pics')
      .range(from, from + PAGE_SIZE - 1)
      .order('sku', { ascending: true }) // Added order for consistent pagination

    if (error) {
      console.error('Error fetching from Supabase:', error)
      throw error
    }

    if (!data || data.length === 0) {
      break
    }

    allData = allData.concat(data)

    if (data.length < PAGE_SIZE) {
      break
    }

    from += PAGE_SIZE
  }

  return allData.map((item) => {
    let pics: string[] | null = null
    if (item.pics) {
      try {
        // Handle potential formats: JSON array or comma-separated string
        if (item.pics.startsWith('[')) {
          pics = JSON.parse(item.pics)
        } else {
          pics = item.pics.split(',').map((s: string) => s.trim())
        }
      } catch {
        pics = [item.pics]
      }
    }

    return {
      sku: item.sku || '',
      name: item.name || '',
      vendor: item.vendor || '',
      price: item.price || 0,
      price_old: item.price_old,
      p2: item.p2,
      stock: item.stock,
      pics: pics,
    }
  })
}
