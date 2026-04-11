import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { DataSource } from '../constants'

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

export type LoadingProgress = {
  loaded: number
  total: number
  percent: number
}

interface StoreState {
  view: 'tile' | 'table' | 'info'
  theme: 'dark' | 'light'
  sort: 'date' | 'note'
  meta: Meta
  loadingProgress: LoadingProgress | null

  actions: {
    setView(this: void, view: StoreState['view']): void
    setTheme(this: void, theme: StoreState['theme']): void
    setSort(this: void, sort: StoreState['sort']): void
    setMeta(this: void, meta: StoreState['meta']): void
    setDataSource(this: void, dataSource: DataSource): void
    setLoadingProgress(this: void, progress: LoadingProgress | null): void
  }
  dataSource: DataSource
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        view: 'tile',
        theme: 'light',
        sort: 'date',
        meta: { vendors: [], created: '' },
        loadingProgress: null,
        dataSource: 'google-drive',
        actions: {
          setSort: (sort) => set(() => ({ sort })),
          setView: (view) => set(() => ({ view })),
          setTheme: (theme) => set({ theme }),
          setMeta: (meta) => set({ meta }, undefined, 'setMeta'),
          setDataSource: (dataSource) => set({ dataSource }),
          setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
        },
      }),
      {
        name: 'lets-bike-app',
        partialize: (state) => ({
          view: state.view,
          theme: state.theme,
          sort: state.sort,
          dataSource: state.dataSource,
        }),
      },
    ),
    {
      name: 'lets-bike-app',
    },
  ),
)

export const useAppActions = () => useStore((state) => state.actions)
export const useAppView = () => useStore((state) => state.view)
export const useAppTheme = () => useStore((state) => state.theme)
export const useAppSort = () => useStore((state) => state.sort)
export const useMeta = () => useStore((state) => state.meta)
export const useDataSource = () => useStore((state) => state.dataSource)
export const useLoadingProgress = () =>
  useStore((state) => state.loadingProgress)
export const useStaleVendors = (): MetaVendor[] => {
  const { vendors } = useMeta()
  return vendors.filter((v) => v.stale)
}
