import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  data: Record<string, Record<string, string>>
  actions: {
    setSetting(this: void, sku: string, config: Record<string, string>): void
    removeSku(this: void, favItem: string): void
  }
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      data: {},
      actions: {
        removeSku: (favItem) => {
          set((state) => {
            const [sku] = favItem.split(':')
            const { [sku]: _, ...data } = state.data

            return { data }
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
