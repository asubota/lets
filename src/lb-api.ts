import { useQuery } from '@tanstack/react-query'
import { getApiPwd, getApiUser } from './secrets'
import { useLBToken } from './store'

const BASE_URL = 'https://letsbike.com.ua'

const headers = {
  'Content-Type': 'application/json',
}

const AUTH_URL = `${BASE_URL}/api/auth/`
const ORDERS_URL = `${BASE_URL}/api/orders/get/`

export async function getToken(): Promise<string | undefined> {
  try {
    const payload = {
      login: getApiUser(),
      password: getApiPwd(),
    }

    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      mode: 'cors',
      credentials: 'include', // Try
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    return result.response.token as string
  } catch {
    console.error(
      'Error fetching token:',
      // error?.response?.data || error.message || error,
    )
  }
}

type Order = {
  id: string
  status: string
}

async function getOrders(token: string): Promise<Order[] | undefined> {
  try {
    const payload = {
      token,
      offset: 0,
      limit: 2,
    }

    const response = await fetch(ORDERS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    return result.response
  } catch {
    console.error(
      'Error fetching token:',
      // error?.response?.data || error.message || error,
    )
  }
}

export const useOrders = () => {
  const token = useLBToken()

  return useQuery({
    staleTime: 5, // 5 minutes
    queryKey: ['orders', token],
    queryFn: () => getOrders(token),
  })
}
