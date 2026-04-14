import { POPULAR_SERViCE_PREFIX } from './constants.ts'
import { getSupabaseClient } from './supabase-client.ts'
import { type CartItem } from './types.ts'

export const getCart = async (signal?: AbortSignal): Promise<CartItem[]> => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('cart')
      .select('*')
      .abortSignal(signal || new AbortController().signal)

    if (error) {
      if (error.message?.includes('AbortError') || error.name === 'AbortError') {
        throw error
      }
      throw new Error(`Supabase Error: ${error.message}`)
    }

    return (data || []) as CartItem[]
  } catch (e: any) {
    if (e?.message?.includes('AbortError') || e?.name === 'AbortError') {
      throw e
    }
    console.error('Supabase fetch error:', e)
    throw e // Перекидаємо помилку далі
  }
}

export const removeFromCart = async (itemId: string) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('itemId', itemId)

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`)
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}

export const addToCart = async (itemId: string) => {
  try {
    const supabase = getSupabaseClient()
    
    const { data } = await supabase
      .from('cart')
      .select('*')
      .eq('itemId', itemId)
      .single()

    if (data) {
      const quantity = String(parseInt(data.quantity, 10) + 1)
      const { error: updateError } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('itemId', itemId)

      if (updateError) {
        throw new Error(`Supabase Error: ${updateError.message}`)
      }
    } else {
      const { error: insertError } = await supabase
        .from('cart')
        .insert({ itemId, quantity: '1', discount: '0', cartId: '1' })

      if (insertError) {
        throw new Error(`Supabase Error: ${insertError.message}`)
      }
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}

export const updateCartItem = async (
  itemId: string,
  updates: Partial<Omit<CartItem, 'itemId'>>
) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('cart')
      .update(updates)
      .eq('itemId', itemId)

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`)
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}

export const setCartPopularServices = async (itemIds: string[]) => {
  try {
    const supabase = getSupabaseClient()
    
    const { error: deleteError } = await supabase
      .from('cart')
      .delete()
      .like('itemId', `${POPULAR_SERViCE_PREFIX}%`)

    if (deleteError) {
      throw new Error(`Supabase Error deleting old services: ${deleteError.message}`)
    }

    if (itemIds.length > 0) {
      const inserts = itemIds.map(id => ({
        itemId: id,
        quantity: '1',
        discount: '0',
        cartId: '1'
      }))

      const { error: insertError } = await supabase
        .from('cart')
        .insert(inserts)

      if (insertError) {
        throw new Error(`Supabase Error inserting new services: ${insertError.message}`)
      }
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}
