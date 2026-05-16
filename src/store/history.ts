import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

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
            const itemSet = new Set(state.items)

            if (item.length > 2) {
              itemSet.add(item)
            }

            return { items: Array.from(itemSet) }
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
  useStore(useShallow((state) => state.items.slice().reverse()))
