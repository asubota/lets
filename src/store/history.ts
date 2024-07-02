import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  items: string[]
  actions: {
    addHistoryItem(this: void, value: string): void
    removeHistoryItem(this: void, value: string): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      items: [],
      actions: {
        addHistoryItem: (item) => {
          set((state) => {
            const set = new Set(state.items)

            if (item.length > 2) {
              set.add(item)
            }

            return { items: Array.from(set) }
          })
        },
        removeHistoryItem: (toRemove) =>
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
