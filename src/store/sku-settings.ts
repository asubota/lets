import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SkuData = {
  min?: string
  max?: string
  note?: string
}

interface StoreState {
  data: Record<string, SkuData>
  actions: {
    removeSettings(this: void, favItem: string): void
    setSetting(this: void, sku: string, config: Partial<SkuData>): void
    removeMinMax(this: void, sku: string): void
    removeNote(this: void, sku: string): void
  }
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      data: {},
      actions: {
        removeSettings: (favItem) => {
          set((state) => {
            const [sku] = favItem.split(':')
            const { [sku]: _, ...data } = state.data

            return { data }
          })
        },
        removeMinMax: (favItem) => {
          set((state) => {
            const [sku] = favItem.split(':')
            const { min: _, max: __, ...rest } = state.data[sku]
            return { data: { ...state.data, [sku]: rest } }
          })
        },
        removeNote: (sku) => {
          set((state) => {
            const { note: _, ...rest } = state.data[sku]
            return { data: { ...state.data, [sku]: rest } }
          })
        },
        setSetting: (sku, config) => {
          set((state) => {
            const update = { ...state.data[sku], ...config }
            return { data: { ...state.data, [sku]: update } }
          })
        },
      },
    }),
    {
      name: 'lets-bike-sku-settings',
      partialize: (state) => ({ data: state.data }),
    },
  ),
)

export const useSkuSettings = () => useStore((state) => state.data)
export const useSkuSettingsActions = () => useStore((state) => state.actions)

export const useGetMinBySku = (sku: string) => useSkuSettings()[sku]?.min || ''
export const useGetMaxBySku = (sku: string) => useSkuSettings()[sku]?.max || ''
export const useGetNoteBySku = (sku: string) =>
  useSkuSettings()[sku]?.note || ''
