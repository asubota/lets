import { FC, lazy, Suspense, useMemo } from 'react'
import { useIsLoading } from '../../use-data.ts'
import { Loader } from '../../components/loader.tsx'
import { Outlet } from '@tanstack/react-router'
import { useFavoriteItems } from './use-favorite-items.ts'
import { FavoriteInput, FavoriteInputForm } from './favorite-input.tsx'
import { FormProvider, useForm } from 'react-hook-form'
import { Product } from '../../types.ts'
const List2 = lazy(() => import('../../components/list.tsx'))

const filterBySearch = (item: Product, search: string): boolean => {
  return (
    item['sku'].toLowerCase().includes(search) ||
    item['name'].toLowerCase().includes(search)
  )
}

const useFavoritesSearch = (search: string, data: Product[]): Product[] => {
  return useMemo(() => {
    const lowerCaseSearch = search.toLowerCase()
    return data.filter((item) => filterBySearch(item, lowerCaseSearch))
  }, [search, data])
}

export const Favorites: FC = () => {
  const list = useFavoriteItems()
  const isLoading = useIsLoading()

  const methods = useForm<FavoriteInputForm>({ defaultValues: { sku: '' } })
  const sku = methods.watch('sku')
  const filtered = useFavoritesSearch(sku, list)

  return (
    <FormProvider {...methods}>
      <FavoriteInput />

      {isLoading ? (
        <Loader />
      ) : (
        <Suspense>
          <List2 list={filtered} search="" />
        </Suspense>
      )}

      <Outlet />
    </FormProvider>
  )
}
