import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseAnonKey, getSupabaseUrl } from './secrets.ts'

let supabaseInstance: SupabaseClient | null = null
let currentKey = ''
let currentUrl = ''

export const getSupabaseClient = (): SupabaseClient => {
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()
  
  if (!url || !key) {
    throw new Error('Supabase URL or Anon Key is missing. Please configure them in the Stats page.')
  }
  
  if (!supabaseInstance || currentKey !== key || currentUrl !== url) {
    currentKey = key
    currentUrl = url
    supabaseInstance = createClient(url, key)
  }
  
  return supabaseInstance
}
