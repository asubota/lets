import { POPULAR_SERViCE_PREFIX } from './constants.ts'
import { getSupabaseClient } from './supabase-client.ts'
import { type CartItem } from './types.ts'

export const getCart = async (signal?: AbortSignal): Promise<CartItem[]> => {
  const supabase = getSupabaseClient()
  const query = supabase.from('cart').select('*').order('created_at')

  if (signal) {
    query.abortSignal(signal)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }

  return (data || []) as CartItem[]
}

export const removeFromCart = async (itemId: string) => {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('itemId', itemId)

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }
}

export const addToCart = async (itemId: string) => {
  const supabase = getSupabaseClient()
  const { error } = await supabase.rpc('add_to_cart', { p_item_id: itemId })

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }
}

export const updateCartItem = async (
  itemId: string,
  updates: Partial<Omit<CartItem, 'itemId'>>,
) => {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from('cart')
    .update(updates)
    .eq('itemId', itemId)

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }
}

export const setCartPopularServices = async (itemIds: string[]) => {
  const supabase = getSupabaseClient()

  const { error: deleteError } = await supabase
    .from('cart')
    .delete()
    .like('itemId', `${POPULAR_SERViCE_PREFIX}%`)

  if (deleteError) {
    throw new Error(`Supabase Error deleting old services: ${deleteError.message}`)
  }

  if (itemIds.length > 0) {
    const inserts = itemIds.map((id) => ({
      itemId: id,
      quantity: '1',
      discount: '0',
      cartId: '1',
    }))

    const { error: insertError } = await supabase.from('cart').insert(inserts)

    if (insertError) {
      throw new Error(`Supabase Error inserting new services: ${insertError.message}`)
    }
  }
}
