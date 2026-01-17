import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  vendors: string[]
  actions: {
    toggleVendor(this: void, vendor: string): void
    addVendor(this: void, vendor: string): void
    removeVendor(this: void, vendor: string): void
    reset(this: void): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      vendors: [],
      actions: {
        toggleVendor: (vendor) => {
          const list = get().vendors || []
          const exists = list.includes(vendor)
          if (exists) {
            set(() => ({ vendors: list.filter((v) => v !== vendor) }))
          } else {
            set(() => ({ vendors: [...list, vendor] }))
          }
        },
        addVendor: (vendor) => set((state) => ({ vendors: [...state.vendors, vendor] })),
        removeVendor: (vendor) => set((state) => ({ vendors: state.vendors.filter((v) => v !== vendor) })),
        reset: () => set(() => ({ vendors: [] })),
      },
    }),
    {
      name: 'lets-bike-applied-filters',
      partialize: (state: StoreState) => ({ vendors: state.vendors }),
    },
  ),
)

export const useAppliedFiltersActions = () => useStore((s) => s.actions)
export const useAppliedFilters = () => useStore((s) => s.vendors)
