import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MetaVendor = {
  load: number
  load_str: string
  parse: number
  parse_str: string
  stale: boolean
  vendor: string
}

export type Meta = {
  created: string
  vendors: MetaVendor[]
}

interface StoreState {
  view: 'tile' | 'table' | 'info'
  theme: 'dark' | 'light'
  sort: 'date' | 'note'
  meta: Meta
  actions: {
    setView(this: void, view: StoreState['view']): void
    setTheme(this: void, theme: StoreState['theme']): void
    setSort(this: void, sort: StoreState['sort']): void
    setMeta(this: void, meta: StoreState['meta']): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      view: 'tile',
      theme: 'light',
      sort: 'date',
      meta: { vendors: [], created: '' },
      actions: {
        setSort: (sort) => set(() => ({ sort })),
        setView: (view) => set(() => ({ view })),
        setTheme: (theme) => set({ theme }),
        setMeta: (meta) => set({ meta }),
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
export const useMeta = () => useStore((state) => state.meta)
export const useStaleVendors = (): MetaVendor[] => {
  const { vendors } = useMeta()
  return vendors.filter((v) => v.stale)
}
