import {
  GOOGLE_API_KEY_KEY,
  GOOGLE_AUTH_TOKEN_KEY,
  GOOGLE_CLIENT_ID_KEY,
  GOOGLE_DATABASE_SPREADSHEET_ID,
  GOOGLE_PRODUCTS_FILE_ID,
} from './constants.ts'

export const removeGoogleAuthToken = () => {
  localStorage.removeItem(GOOGLE_AUTH_TOKEN_KEY)
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
