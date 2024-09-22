import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { useStore as useSkuSettingsStore } from './sku-settings.ts'

interface StoreState {
  items: string[]
  actions: {
    toggle(this: void, value: string): void
  }
}

const useStore = create<StoreState>()(
  subscribeWithSelector(
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
  ),
)

export const useFavsActions = () => useStore((state) => state.actions)
export const useFavsItems = () => useStore((state) => state.items)

const getDiff = (arr1: string[], arr2: string[]) => {
  return arr1.filter((x) => !arr2.includes(x))
}

useStore.subscribe(
  (state) => state.items,
  (current, old) => {
    const { removeSettings } = useSkuSettingsStore.getState().actions

    getDiff(old, current).forEach(removeSettings)
  },
)
