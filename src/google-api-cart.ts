import { POPULAR_SERViCE_PREFIX } from './constants.ts'
import { send } from './google-api.ts'
import { getGoogleApiKey, getGoogleSpreadSheetId } from './secrets.ts'
import { type CartItem } from './types.ts'

const SPREADSHEET_ID = getGoogleSpreadSheetId()
const API_KEY = getGoogleApiKey()
const SHEET_NAME = 'cart'

type GRow = [string, string, string, string]

const mapping: Record<keyof CartItem, string> = {
  itemId: 'A',
  discount: 'B',
  quantity: 'C',
  cartId: 'D',
}

export const getCart = async (signal?: AbortSignal): Promise<CartItem[]> => {
  if (!SPREADSHEET_ID || !API_KEY) {
    return []
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
  const response = await fetch(url, { signal })
  const result = await response.json()
  const rows = result.values

  return rows.slice(1).map((row: GRow) => ({
    itemId: row[0],
    discount: row[1],
    quantity: row[2],
    cartId: row[3],
  }))
}

export const setCartProp = async (
  itemId: string,
  propName: keyof CartItem,
  propValue: string,
) => {
  const cart = await getCart()
  const rowIndex = cart.findIndex((f) => f.itemId === itemId)

  if (rowIndex !== -1) {
    const body = { values: [[propValue]] }
    const range = `${SHEET_NAME}!${mapping[propName]}${rowIndex + 2}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW&key=${API_KEY}`

    await send(url, { body: JSON.stringify(body), method: 'PUT' })
  }
}

export const setCartPopularServices = async (itemIds: string[]) => {
  const cart = await getCart()

  const ranges: string[] = []
  cart.forEach((cartItem, rowIndex) => {
    if (
      cartItem.itemId !== undefined &&
      cartItem.itemId.startsWith(POPULAR_SERViCE_PREFIX)
    ) {
      ranges.push(`${SHEET_NAME}!A${rowIndex + 2}:F${rowIndex + 2}`)
    }
  })

  if (ranges.length) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchClear?key=${API_KEY}`
    await send(url, {
      method: 'POST',
      body: JSON.stringify({ ranges }),
    })
  }

  const values = itemIds.map((itemId) => [itemId, '0', '1', '1'])
  const body = { values }
  const range = `${SHEET_NAME}!A1`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW&key=${API_KEY}`

  await send(url, { body: JSON.stringify(body), method: 'POST' })
}

export const removeFromCart = async (itemId: string) => {
  const cart = await getCart()
  const rowIndex = cart.findIndex((f) => f.itemId === itemId)

  if (rowIndex !== -1) {
    const range = `${SHEET_NAME}!A${rowIndex + 2}:F${rowIndex + 2}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:clear?key=${API_KEY}`

    await send(url, { method: 'POST' })
  }
}

export const addToCart = async (itemId: string) => {
  const cart = await getCart()
  const rowIndex = cart.findIndex((f) => f.itemId === itemId)

  if (rowIndex === -1) {
    const body = { values: [[itemId, '0', '1', '1']] }
    const range = `${SHEET_NAME}!A1`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW&key=${API_KEY}`

    await send(url, { body: JSON.stringify(body), method: 'POST' })
  } else {
    const item = cart[rowIndex]
    const quantity = parseInt(item.quantity, 10) + 1
    const body = { values: [[quantity]] }
    const range = `${SHEET_NAME}!${mapping['quantity']}${rowIndex + 2}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=RAW&key=${API_KEY}`

    await send(url, { body: JSON.stringify(body), method: 'PUT' })
  }
}
