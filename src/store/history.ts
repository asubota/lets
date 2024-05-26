import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HistoryState {
  items: string[]
  actions: {
    add(this: void, value: string): void
    remove(this: void, value: string): void
  }
}

const useHistoryStore = create<HistoryState>()(
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

export const useHistoryActions = () => useHistoryStore((state) => state.actions)
export const useHistoryItems = () =>
  useHistoryStore((state) => state.items.slice().reverse())
