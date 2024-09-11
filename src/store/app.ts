import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  view: 'tile' | 'table'
  theme: 'dark' | 'light'
  actions: {
    setView(this: void, view: StoreState['view']): void
    setTheme(this: void, theme: StoreState['theme']): void
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
        setTheme: (theme) => set({ theme }),
      },
    }),
    {
      name: 'lets-bike-app',
      partialize: (state) => ({
        view: state.view,
        theme: state.theme,
      }),
    },
  ),
)

export const useAppActions = () => useStore((state) => state.actions)
export const useAppView = () => useStore((state) => state.view)
export const useAppTheme = () => useStore((state) => state.theme)
