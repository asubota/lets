import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  view: 'tile' | 'table'
  actions: {
    toggleView(this: void): void
    setView(this: void, view: AppState['view']): void
  }
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      view: 'tile',
      actions: {
        setView: (view) => {
          set(() => {
            return { view }
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

export const useAppActions = () => useAppStore((state) => state.actions)
export const useAppView = () => useAppStore((state) => state.view)
