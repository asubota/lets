import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  items: string[]
  actions: {
    toggle(this: void, value: string): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      items: [],
      actions: {
        toggle: (item) => {
          set((state) => {
            const set = new Set(state.items)

            if (set.has(item)) {
              set.delete(item)
            } else {
              set.add(item)
            }

            return { items: Array.from(set) }
          })
        },
      },
    }),
    {
      name: 'lets-bike-search-favs',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export const useFavsActions = () => useStore((state) => state.actions)
export const useFavsItems = () => useStore((state) => state.items)
