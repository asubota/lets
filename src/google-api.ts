import { FavoriteItem } from './types.ts'
import { getGoogleApiKey, getGoogleSpreadSheetId } from './secrets.ts'
import { getAccessToken } from './google-auth.ts'

const SPREADSHEET_ID = getGoogleSpreadSheetId()
const API_KEY = getGoogleApiKey()
const SHEET_NAME = 'favorites'

type GRow = [string, string, string, string, string]

const mapping: Record<keyof FavoriteItem, string> = {
  favoriteId: 'A',
  min: 'B',
  max: 'C',
  note: 'D',
  time: 'E',
}

export const getAllFavorites = async (
  signal?: AbortSignal,
): Promise<FavoriteItem[]> => {
  if (!SPREADSHEET_ID || !API_KEY) {
    return []
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
  const token = await getAccessToken()

  const response = await fetch(url, {
    signal,
    headers: { Authorization: `Bearer ${token}` },
  })

  const result = await response.json()
  const rows = result.values

  return rows.slice(1).map((row: GRow) => ({
    favoriteId: row[0],
    min: row[1] ? parseInt(row[1], 10) : undefined,
    max: row[2] ? parseInt(row[2], 10) : undefined,
    note: row[3] || undefined,
    time: row[4] ? parseInt(row[4], 10) : 0,
  }))
}

export const removeFavorite = async (favoriteId: string) => {
  const favorites = await getAllFavorites()
  const rowIndex = favorites.findIndex((f) => f.favoriteId === favoriteId)

  if (rowIndex !== -1) {
    const range = `${SHEET_NAME}!A${rowIndex + 2}:E${rowIndex + 2}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:clear?key=${API_KEY}`
    const token = await getAccessToken()

    await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
  }
}

export const addFavorite = async (favoriteId: string) => {
  const body = { values: [[favoriteId, '', '', '', +new Date()]] }
  const range = `${SHEET_NAME}!A1`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW&key=${API_KEY}`
  const token = await getAccessToken()

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
}

export const setProp = async (
  favoriteId: string,
  propName: keyof FavoriteItem,
  propValue: string,
) => {
  const favorites = await getAllFavorites()
  const rowIndex = favorites.findIndex((f) => f.favoriteId === favoriteId)

  if (rowIndex !== -1) {
    const body = { values: [[propValue]] }
    const range = `${SHEET_NAME}!${mapping[propName]}${rowIndex + 2}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW&key=${API_KEY}`
    const token = await getAccessToken()

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
