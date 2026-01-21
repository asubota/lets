import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

export type SortOrder = 'asc' | 'desc' | undefined
export type SortField = 'price' | 'name' | undefined

interface StoreState {
  vendors: string[]
  sortOrder: SortOrder
  sortField: SortField
  actions: {
    toggleVendor(this: void, vendor: string): void
    addVendor(this: void, vendor: string): void
    removeVendor(this: void, vendor: string): void
    setSort(this: void, field: SortField, order: SortOrder): void
    toggleSort(this: void, field: 'price' | 'name'): void
    reset(this: void): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      vendors: [],
      sortOrder: undefined,
      sortField: undefined,
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
        setSort: (field, order) => set(() => ({ sortField: field, sortOrder: order })),
        toggleSort: (field) => {
          const { sortField, sortOrder } = get()
          if (sortField !== field) {
            set(() => ({ sortField: field, sortOrder: 'asc' }))
          } else if (sortOrder === 'asc') {
            set(() => ({ sortField: field, sortOrder: 'desc' }))
          } else {
            set(() => ({ sortField: undefined, sortOrder: undefined }))
          }
        },
        reset: () => set(() => ({ vendors: [], sortField: undefined, sortOrder: undefined })),
      },
    }),
    {
      name: 'lets-bike-applied-filters',
      partialize: (state: StoreState) => ({
        vendors: state.vendors,
        sortField: state.sortField,
        sortOrder: state.sortOrder,
      }),
    },
  ),
)

export const useAppliedFiltersActions = () => useStore((s) => s.actions)
export const useAppliedFilters = () => useStore((s) => s.vendors)
export const useSortConfig = () => useStore(useShallow((s) => ({ field: s.sortField, order: s.sortOrder })))
