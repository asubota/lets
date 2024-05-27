import { create } from 'zustand'

interface SearchState {
  displayLimitModal: boolean
  vendors: string[]
  actions: {
    toggleLimitModal(this: void): void
    setSearchVendors(this: void, vendors: string[]): void
    resetSearchVendors(this: void): void
  }
}

const useSearchStore = create<SearchState>()((set) => ({
  displayLimitModal: false,
  vendors: [],
  actions: {
    setSearchVendors: (vendors) => set(() => ({ vendors })),
    resetSearchVendors: () => set(() => ({ vendors: [] })),
    toggleLimitModal: () =>
      set((state) => ({ displayLimitModal: !state.displayLimitModal })),
  },
}))

export const useSearchActions = () => useSearchStore((state) => state.actions)
export const useSearchVendors = () => useSearchStore((state) => state.vendors)
export const useShowLimitModal = () =>
  useSearchStore((state) => state.displayLimitModal)
