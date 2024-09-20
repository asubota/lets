import { useAllData } from '../use-data.ts'
import { useSkuSettings } from '../store/sku-settings.ts'
import { useMemo } from 'react'

export const useGetChangedProducts = () => {
  const data = useAllData()
  const settings = useSkuSettings()

  const items = useMemo(() => {
    return data
      .filter((p) => p.sku in settings && !!p.stock)
      .filter((p) => {
        const stock = parseInt(p.stock || '', 10)
        const min = parseInt(settings[p.sku].min, 10)
        const max = parseInt(settings[p.sku].max, 10)

        if (stock <= min || stock >= max) {
          return p
        }
      })
  }, [data, settings])

  const skus = items.map((item) => item.sku)

  return { items, skus }
}
