import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  view: 'tile' | 'table'
  mode: 'search' | 'favs' | 'scan' | 'colors'
  theme: 'dark' | 'light'
  actions: {
    setMode(this: void, mode: StoreState['mode']): void
    setView(this: void, view: StoreState['view']): void
    setTheme(this: void, theme: StoreState['theme']): void
    toggleFavs(this: void): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      view: 'tile',
      mode: 'search',
      theme: 'light',
      actions: {
        setView: (view) => set(() => ({ view })),
        setMode: (mode) => set(() => ({ mode })),
        setTheme: (theme) => set({ theme }),
        toggleFavs: () =>
          set((state) => {
            return { mode: state.mode === 'favs' ? 'search' : 'favs' }
          }),
      },
    }),
    {
      name: 'lets-bike-app',
      partialize: (state) => ({
        view: state.view,
        mode: state.mode,
        theme: state.theme,
      }),
    },
  ),
)

export const useAppActions = () => useStore((state) => state.actions)
export const useAppView = () => useStore((state) => state.view)
export const useAppMode = () => useStore((state) => state.mode)
export const useAppTheme = () => useStore((state) => state.theme)
