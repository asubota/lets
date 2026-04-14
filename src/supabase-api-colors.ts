import { getSupabaseClient } from './supabase-client.ts'
import { type VendorAndColors } from './types.ts'

export const getAllColors = async (signal?: AbortSignal): Promise<VendorAndColors[]> => {
  const supabase = getSupabaseClient()
  const query = supabase.from('vendor_colors').select('*')

  if (signal) {
    query.abortSignal(signal)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }

  return (data || []) as VendorAndColors[]
}

export const removeColor = async ({ vendor }: VendorAndColors) => {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from('vendor_colors').delete().eq('vendor', vendor)

  if (error) {
    throw new Error(`Supabase Error removing color: ${error.message}`)
  }
}

export const setColor = async ({ vendor, color, borderColor, backgroundColor }: VendorAndColors) => {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from('vendor_colors').upsert({
    vendor,
    color: color || null,
    backgroundColor: backgroundColor || null,
    borderColor: borderColor || null,
  })

  if (error) {
    throw new Error(`Supabase Error setting color: ${error.message}`)
  }
}
