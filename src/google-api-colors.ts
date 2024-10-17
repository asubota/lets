import { getGoogleApiKey, getGoogleSpreadSheetId } from './secrets.ts'
import { getAccessToken } from './google-auth.ts'
import { VendorAndColors } from './types.ts'

const SPREADSHEET_ID = getGoogleSpreadSheetId()
const API_KEY = getGoogleApiKey()
const SHEET_NAME = 'colors'

type GRow = [string, string, string, string]

export const getAllColors = async (
  signal?: AbortSignal,
): Promise<VendorAndColors[]> => {
  if (!SPREADSHEET_ID || !API_KEY) {
    return []
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
  const response = await fetch(url, { signal })
  const result = await response.json()
  const rows = result.values

  return rows
    .slice(1)
    .map(([vendor, color, backgroundColor, borderColor]: GRow) => ({
      vendor,
      ...(color && { color }),
      ...(backgroundColor && { backgroundColor }),
      ...(borderColor && { borderColor }),
    }))
}

const send = async (url: string, options: RequestInit) => {
  const token = await getAccessToken()

  await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    ...options,
  })
}

export const setProp = async ({
  vendor,
  color,
  borderColor,
  backgroundColor,
}: VendorAndColors) => {
  const colors = await getAllColors()
  const rowIndex = colors.findIndex((f) => f.vendor === vendor)
  const body = { values: [[vendor, color, backgroundColor, borderColor]] }

  if (rowIndex === -1) {
    const range = `${SHEET_NAME}!A1`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW&key=${API_KEY}`

    await send(url, { body: JSON.stringify(body), method: 'POST' })
  }

  if (rowIndex !== -1) {
    const range = `${SHEET_NAME}!A:D${rowIndex + 2}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW&key=${API_KEY}`

    await send(url, { body: JSON.stringify(body), method: 'PUT' })
  }
}
