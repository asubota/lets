import { FavoriteItem } from './types.ts'
import {
  getGoogleApiKey,
  getGoogleSpreadSheetId,
  removeGoogleAuthToken,
} from './secrets.ts'

const SPREADSHEET_ID = getGoogleSpreadSheetId()
const API_KEY = getGoogleApiKey()
const SHEET_NAME = 'favorites'

type GRow = [string, string, string, string]

const mapping: Record<keyof FavoriteItem, string> = {
  favoriteId: 'A',
  min: 'B',
  max: 'C',
  note: 'D',
}

export const healthCheck = (token: string) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`

  fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
    (response) => {
      if (response.status === 401) {
        removeGoogleAuthToken()
      }

      return response.json()
    },
  )
}

export const getAllFavorites = async (
  token: string,
): Promise<FavoriteItem[]> => {
  if (!SPREADSHEET_ID || !API_KEY) {
    return []
  }
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (response.status === 401) {
    removeGoogleAuthToken()
  }

  const result = await response.json()
  const rows = result.values

  return rows.slice(1).map((row: GRow) => ({
    favoriteId: row[0],
    min: row[1] ? parseInt(row[1], 10) : undefined,
    max: row[2] ? parseInt(row[2], 10) : undefined,
    note: row[3] || undefined,
  }))
}

export const removeFavorite = async (
  favoriteId: string,
  token: string,
  favorites: FavoriteItem[],
) => {
  const rowIndex = favorites.findIndex((f) => f.favoriteId === favoriteId)

  if (rowIndex !== -1) {
    const range = `${SHEET_NAME}!A${rowIndex + 2}:D${rowIndex + 2}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:clear?key=${API_KEY}`

    await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
  }
}

export const addFavorite = async (favoriteId: string, token: string) => {
  const range = `${SHEET_NAME}!A1`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW&key=${API_KEY}`

  const body = {
    values: [[favoriteId, '', '', '']],
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  await response.json()
}

export const setProp = async (
  favoriteId: string,
  propName: keyof FavoriteItem,
  propValue: string,
  token: string,
  favorites: FavoriteItem[],
) => {
  const rowIndex = favorites.findIndex((f) => f.favoriteId === favoriteId)

  if (rowIndex !== -1) {
    const range = `${SHEET_NAME}!${mapping[propName]}${rowIndex + 2}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW&key=${API_KEY}`
    const body = {
      values: [[propValue]],
    }

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
  }
}
