import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Color = { color: string; borderColor: string; backgroundColor: string }

interface StoreState {
  colors: Record<string, Color>
  actions: {
    setColors(this: void, colors: StoreState['colors']): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      colors: {},
      actions: {
        setColors: (colors) => {
          set(() => {
            return { colors }
          })
        },
      },
    }),
    {
      name: 'lets-bike-vendor-colors',
      partialize: (state) => ({ colors: state.colors }),
    },
  ),
)

export const useVendorColor = (vendor: string): Color | undefined =>
  useStore((state) => state.colors[vendor])
export const useVendorColors = () => useStore((state) => state.colors)
export const useSetVendorColorsAction = () =>
  useStore((state) => state.actions.setColors)
