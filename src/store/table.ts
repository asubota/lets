import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types.ts'

interface TableState {
  columns: (keyof Product)[]
  actions: {
    setColumns(this: void, value: (keyof Product)[]): void
  }
}

const useTableStore = create<TableState>()(
  persist(
    (set) => ({
      columns: [],
      actions: {
        setColumns: (columns) => set(() => ({ columns })),
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
