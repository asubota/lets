import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseAnonKey, getSupabaseUrl } from './secrets.ts'

let supabaseInstance: SupabaseClient | null = null
let instanceCredentials = ''

export const getSupabaseClient = (): SupabaseClient => {
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()

  if (!url || !key) {
    throw new Error('Supabase URL or Anon Key is missing. Please configure them in the Stats page.')
  }

  // Reuse the client until the credentials change
  const credentials = `${url}|${key}`
  if (!supabaseInstance || instanceCredentials !== credentials) {
    supabaseInstance = createClient(url, key)
    instanceCredentials = credentials
  }

  return supabaseInstance
}
