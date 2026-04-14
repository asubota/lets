import { getSupabaseClient } from './supabase-client.ts'
import { type VendorAndColors } from './types.ts'

export const getAllColors = async (signal?: AbortSignal): Promise<VendorAndColors[]> => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('vendor_colors')
      .select('*')
      .abortSignal(signal || new AbortController().signal)

    if (error) {
      if (error.message?.includes('AbortError') || error.name === 'AbortError') {
        throw error
      }
      throw new Error(`Supabase Error: ${error.message}`)
    }

    return (data || []) as VendorAndColors[]
  } catch (e: any) {
    if (e?.message?.includes('AbortError') || e?.name === 'AbortError') {
      throw e
    }
    console.error('Supabase fetch error:', e)
    throw e // Перекидаємо помилку далі
  }
}

export const removeColor = async ({ vendor }: VendorAndColors) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.from('vendor_colors').delete().eq('vendor', vendor)

    if (error) {
      console.error('Error removing color:', error)
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}

export const setColor = async ({ vendor, color, borderColor, backgroundColor }: VendorAndColors) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.from('vendor_colors').upsert({
      vendor,
      color: color || null,
      backgroundColor: backgroundColor || null,
      borderColor: borderColor || null,
    })

    if (error) {
      console.error('Error setting color:', error)
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}
