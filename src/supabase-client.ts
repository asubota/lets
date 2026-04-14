import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseAnonKey, getSupabaseUrl } from './secrets.ts'

let supabaseInstance: SupabaseClient | null = null

export const getSupabaseClient = (): SupabaseClient => {
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()

  if (!url || !key) {
    throw new Error('Supabase URL or Anon Key is missing. Please configure them in the Stats page.')
  }

  // Credentials come from localStorage and don't change without a page reload,
  // so a single cached instance is safe for the lifetime of the page.
  supabaseInstance ??= createClient(url, key)

  return supabaseInstance
}

/** Call this after the user saves new credentials so the next request gets a fresh client. */
export const resetSupabaseClient = () => {
  supabaseInstance = null
}
