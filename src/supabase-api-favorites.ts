import { getSupabaseClient } from './supabase-client.ts'
import { type FavoriteItem } from './types.ts'

export const getAllFavorites = async (
  signal?: AbortSignal,
): Promise<FavoriteItem[]> => {
  const supabase = getSupabaseClient()
  const query = supabase.from('favorites').select('*')

  if (signal) {
    query.abortSignal(signal)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }

  return (data || []) as FavoriteItem[]
}

export const removeFavorite = async (favoriteId: string) => {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('favoriteId', favoriteId)

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }
}

export const addFavorite = async (favoriteId: string) => {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from('favorites')
    .upsert({
      favoriteId,
      time: Date.now(),
      read: false,
    })

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }
}

export const updateFavorite = async (
  favoriteId: string,
  updates: Partial<Omit<FavoriteItem, 'favoriteId'>>,
) => {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from('favorites')
    .update(updates)
    .eq('favoriteId', favoriteId)

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`)
  }
}

export const updateFavoriteId = async (oldId: string, newId: string) => {
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
    console.error('Renamed favorite inserted but old one could not be deleted:', deleteError)
  }
}
