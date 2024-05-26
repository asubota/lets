import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types.ts'

interface TableState {
  columns: (keyof Product)[]
  showSettings: boolean
  actions: {
    setColumns(this: void, value: (keyof Product)[]): void
    toggleSettings(this: void): void
  }
}

const useTableStore = create<TableState>()(
  persist(
    (set) => ({
      columns: [],
      showSettings: false,
      actions: {
        setColumns: (columns) => set(() => ({ columns })),
        toggleSettings: () =>
          set((state) => ({ showSettings: !state.showSettings })),
      },
    }),
    {
      name: 'lets-bike-table',
      partialize: (state) => ({ columns: state.columns }),
    },
  ),
)

export const useTableActions = () => useTableStore((state) => state.actions)
export const useTableColumns = () => useTableStore((state) => state.columns)
export const useShowTableSettings = () =>
  useTableStore((state) => state.showSettings)
