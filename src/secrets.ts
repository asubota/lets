import {
  GOOGLE_API_KEY_KEY,
  GOOGLE_AUTH_TOKEN_KEY,
  GOOGLE_AUTH_TOKEN_KEY_EXPIRES_AT,
  GOOGLE_CLIENT_ID_KEY,
  GOOGLE_DATABASE_SPREADSHEET_ID,
  GOOGLE_PRODUCTS_FILE_ID,
  SUPABASE_ANON_KEY_KEY,
  SUPABASE_URL_KEY,
} from './constants.ts'
import { db } from './db.ts'

export const removeGoogleAuthTokenAndExpiry = () => {
  localStorage.removeItem(GOOGLE_AUTH_TOKEN_KEY)
  localStorage.removeItem(GOOGLE_AUTH_TOKEN_KEY_EXPIRES_AT)
}

export const setGoogleAuthTokenExpiration = (value: string) => {
  localStorage.setItem(GOOGLE_AUTH_TOKEN_KEY_EXPIRES_AT, value)
}

export const getGoogleAuthTokenExpiration = () => {
  return localStorage.getItem(GOOGLE_AUTH_TOKEN_KEY_EXPIRES_AT) || '0'
}

export const setGoogleAuthToken = (value: string) => {
  localStorage.setItem(GOOGLE_AUTH_TOKEN_KEY, value)
}

export const getGoogleAuthToken = () => {
  return localStorage.getItem(GOOGLE_AUTH_TOKEN_KEY) || ''
}

export const getGoogleApiKey = () => {
  return localStorage.getItem(GOOGLE_API_KEY_KEY) || ''
}

export const getGoogleClientId = () => {
  return localStorage.getItem(GOOGLE_CLIENT_ID_KEY) || ''
}

export const getGoogleSpreadSheetId = () => {
  return localStorage.getItem(GOOGLE_DATABASE_SPREADSHEET_ID) || ''
}

export const getGoogleFileId = () => {
  return localStorage.getItem(GOOGLE_PRODUCTS_FILE_ID) || ''
}

export const getSupabaseUrl = () => {
  return localStorage.getItem(SUPABASE_URL_KEY) || ''
}

export const getSupabaseAnonKey = () => {
  return localStorage.getItem(SUPABASE_ANON_KEY_KEY) || ''
}

export const setSupabaseConfig = async (url: string, key: string) => {
  localStorage.setItem(SUPABASE_URL_KEY, url)
  localStorage.setItem(SUPABASE_ANON_KEY_KEY, key)
  await db.setConfig(SUPABASE_URL_KEY, url)
  await db.setConfig(SUPABASE_ANON_KEY_KEY, key)
}
