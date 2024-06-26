import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  items: string[]
  actions: {
    add(this: void, value: string): void
    remove(this: void, value: string): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      items: [],
      actions: {
        add: (item) => {
          set((state) => {
            const set = new Set(state.items)
            set.add(item)

            return { items: Array.from(set) }
          })
        },
        remove: (toRemove) =>
          set((state) => ({
            items: state.items.filter((item) => item !== toRemove),
          })),
      },
    }),
    {
      name: 'lets-bike-search-history',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export const useHistoryActions = () => useStore((state) => state.actions)
export const useHistoryItems = () =>
  useStore((state) => state.items.slice().reverse())
