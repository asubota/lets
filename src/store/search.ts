import { create } from 'zustand'

interface StoreState {
  displayAppliedFiltersModal: boolean
  vendors: string[]
  actions: {
    toggleAppliedFiltersModal(this: void): void
    setSearchVendors(this: void, vendors: string[]): void
    resetSearchVendors(this: void): void
  }
}

const useStore = create<StoreState>()((set) => ({
  displayAppliedFiltersModal: false,
  vendors: [],
  actions: {
    setSearchVendors: (vendors) => set(() => ({ vendors })),
    resetSearchVendors: () => set(() => ({ vendors: [] })),
    toggleAppliedFiltersModal: () =>
      set((state) => ({
        displayAppliedFiltersModal: !state.displayAppliedFiltersModal,
      })),
  },
}))

export const useSearchActions = () => useStore((state) => state.actions)
export const useSearchVendors = () => useStore((state) => state.vendors)
export const useShowAppliedFiltersModal = () =>
  useStore((state) => state.displayAppliedFiltersModal)
