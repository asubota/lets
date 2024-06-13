import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  view: 'tile' | 'table'
  showFavs: boolean
  actions: {
    toggleFavs(this: void): void
    toggleView(this: void): void
    setView(this: void, view: StoreState['view']): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      view: 'tile',
      showFavs: false,
      actions: {
        setView: (view) => {
          set(() => {
            return { view }
          })
        },
        toggleFavs: () => {
          set((state) => {
            return { showFavs: !state.showFavs }
          })
        },
        toggleView: () =>
          set((state) => {
            return { view: state.view === 'tile' ? 'table' : 'tile' }
          }),
      },
    }),
    {
      name: 'lets-bike-app',
      partialize: (state) => ({ view: state.view }),
    },
  ),
)

export const useAppActions = () => useStore((state) => state.actions)
export const useAppView = () => useStore((state) => state.view)
export const useShowFavs = () => useStore((state) => state.showFavs)
