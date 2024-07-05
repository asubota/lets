import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  view: 'tile' | 'table'
  mode: 'search' | 'favs' | 'scan' | 'colors'
  actions: {
    setMode(this: void, mode: StoreState['mode']): void
    setView(this: void, view: StoreState['view']): void
    toggleFavs(this: void): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      view: 'tile',
      mode: 'search',
      actions: {
        setView: (view) => {
          set(() => {
            return { view }
          })
        },
        setMode: (mode) => {
          set(() => {
            return { mode }
          })
        },
        toggleFavs: () =>
          set((state) => {
            return { mode: state.mode === 'favs' ? 'search' : 'favs' }
          }),
      },
    }),
    {
      name: 'lets-bike-app',
      partialize: (state) => ({ view: state.view, mode: state.mode }),
    },
  ),
)

export const useAppActions = () => useStore((state) => state.actions)
export const useAppView = () => useStore((state) => state.view)
export const useAppMode = () => useStore((state) => state.mode)
