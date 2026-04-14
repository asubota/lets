import { getSupabaseClient } from './supabase-client.ts'
import { type FavoriteItem } from './types.ts'

export const getAllFavorites = async (
  signal?: AbortSignal,
): Promise<FavoriteItem[]> => {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .abortSignal(signal || new AbortController().signal)

    if (error) {
      if (error.message?.includes('AbortError') || error.name === 'AbortError') {
        throw error
      }
      throw new Error(`Supabase Error: ${error.message}`)
    }

    return (data || []) as FavoriteItem[]
  } catch (e: any) {
    if (e?.message?.includes('AbortError') || e?.name === 'AbortError') {
      throw e
    }
    console.error('Supabase fetch error:', e)
    throw e // Перекидаємо помилку далі, щоб React Query знав про проблему
  }
}

export const removeFavorite = async (favoriteId: string) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('favoriteId', favoriteId)

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`)
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}

export const addFavorite = async (favoriteId: string) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('favorites')
      .upsert({
        favoriteId,
        time: Date.now(),
        read: false
      })

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`)
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}

export const updateFavorite = async (
  favoriteId: string,
  updates: Partial<Omit<FavoriteItem, 'favoriteId'>>
) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('favorites')
      .update(updates)
      .eq('favoriteId', favoriteId)

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`)
    }
  } catch (e) {
    console.error('Supabase client error:', e)
  }
}

export const updateFavoriteId = async (oldId: string, newId: string) => {
  try {
    const supabase = getSupabaseClient()

    // Get old data
    const { data: oldData, error: fetchError } = await supabase
      .from('favorites')
      .select('*')
      .eq('favoriteId', oldId)
      .single()

    if (fetchError || !oldData) {
      throw new Error(`Could not find favorite to rename: ${fetchError?.message}`)
    }

    // Insert new
    const { error: insertError } = await supabase
      .from('favorites')
      .insert({
        ...oldData,
        favoriteId: newId,
      })

    if (insertError) {
      throw new Error(`Could not insert renamed favorite: ${insertError.message}`)
    }

    // Delete old
    const { error: deleteError } = await supabase
      .from('favorites')
      .delete()
      .eq('favoriteId', oldId)

    if (deleteError) {
      console.error(
        'Renamed favorite inserted but old one could not be deleted:',
        deleteError,
      )
    }
  } catch (e) {
    console.error('Supabase client error during rename:', e)
  }
}



