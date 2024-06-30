import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  id: string
  actions: {
    setId(this: void, value: string): void
  }
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      id: '',
      actions: {
        setId: (id) => {
          set(() => {
            return { id }
          })
        },
      },
    }),
    {
      name: 'lets-bike-file-id',
      partialize: (state) => ({ id: state.id }),
    },
  ),
)

export const useBikeId = () => useStore((state) => state.id)
