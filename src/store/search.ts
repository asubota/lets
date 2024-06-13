import { create } from 'zustand'

interface StoreState {
  displayLimitModal: boolean
  vendors: string[]
  actions: {
    toggleLimitModal(this: void): void
    setSearchVendors(this: void, vendors: string[]): void
    resetSearchVendors(this: void): void
  }
}

const useStore = create<StoreState>()((set) => ({
  displayLimitModal: false,
  vendors: [],
  actions: {
    setSearchVendors: (vendors) => set(() => ({ vendors })),
    resetSearchVendors: () => set(() => ({ vendors: [] })),
    toggleLimitModal: () =>
      set((state) => ({ displayLimitModal: !state.displayLimitModal })),
  },
}))

export const useSearchActions = () => useStore((state) => state.actions)
export const useSearchVendors = () => useStore((state) => state.vendors)
export const useShowLimitModal = () =>
  useStore((state) => state.displayLimitModal)
