import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  view: 'tile' | 'table'
  theme: 'dark' | 'light'
  sort: 'date' | 'note'
  lbToken: string
  actions: {
    setView(this: void, view: StoreState['view']): void
    setTheme(this: void, theme: StoreState['theme']): void
    setSort(this: void, sort: StoreState['sort']): void
    setLBToken(this: void, sort: StoreState['lbToken']): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      view: 'tile',
      theme: 'light',
      sort: 'date',
      lbToken: '',
      actions: {
        setSort: (sort) => set(() => ({ sort })),
        setView: (view) => set(() => ({ view })),
        setTheme: (theme) => set({ theme }),
        setLBToken: (lbToken) => set({ lbToken }),
      },
    }),
    {
      name: 'lets-bike-app',
      partialize: (state) => ({
        view: state.view,
        theme: state.theme,
        sort: state.sort,
      }),
    },
  ),
)

export const useAppActions = () => useStore((state) => state.actions)
export const useAppView = () => useStore((state) => state.view)
export const useAppTheme = () => useStore((state) => state.theme)
export const useAppSort = () => useStore((state) => state.sort)
export const useLBToken = () => useStore((state) => state.lbToken)
