import { create } from 'zustand'

interface StoreState {
  displayAppliedFiltersModal: boolean
  actions: {
    toggleAppliedFiltersModal(this: void): void
  }
}

const useStore = create<StoreState>()((set) => ({
  displayAppliedFiltersModal: false,
  actions: {
    toggleAppliedFiltersModal: () =>
      set((state) => ({
        displayAppliedFiltersModal: !state.displayAppliedFiltersModal,
      })),
  },
}))

export const useSearchActions = () => useStore((state) => state.actions)
export const useShowAppliedFiltersModal = () => useStore((state) => state.displayAppliedFiltersModal)
