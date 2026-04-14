import {
  SUPABASE_ANON_KEY_KEY,
  SUPABASE_URL_KEY,
} from './constants.ts'
import { db } from './db.ts'

export const getSupabaseUrl = () => {
  return localStorage.getItem(SUPABASE_URL_KEY)?.trim() || ''
}

export const getSupabaseAnonKey = () => {
  return localStorage.getItem(SUPABASE_ANON_KEY_KEY)?.trim() || ''
}

export const setSupabaseConfig = async (url: string, key: string) => {
  localStorage.setItem(SUPABASE_URL_KEY, url)
  localStorage.setItem(SUPABASE_ANON_KEY_KEY, key)
  await db.setConfig(SUPABASE_URL_KEY, url)
  await db.setConfig(SUPABASE_ANON_KEY_KEY, key)
}
