import { FC, lazy, Suspense } from 'react'
import { useIsLoading } from '../../use-data.ts'
import { Loader } from '../../components/loader.tsx'
import { Outlet } from '@tanstack/react-router'
import { useFavoriteItems } from './use-favorite-items.ts'
import { FavoriteInput, FavoriteInputForm } from './favorite-input.tsx'
import { FormProvider, useForm } from 'react-hook-form'
import { Product } from '../../types.ts'
import { filterBySearch } from '../../tools.tsx'

const Products = lazy(() => import('../../components/products.tsx'))

const useFavoritesSearch = (search: string, data: Product[]): Product[] => {
  const lowerCaseSearch = search.toLowerCase()

  return data.filter((item) => filterBySearch(item, lowerCaseSearch))
}

export const Favorites: FC = () => {
  const list = useFavoriteItems()
  const isLoading = useIsLoading()

  const methods = useForm<FavoriteInputForm>({ defaultValues: { sku: '' } })
  const sku = methods.watch('sku')
  const filtered = useFavoritesSearch(sku, list)

  return (
    <>
      <FormProvider {...methods}>
        <FavoriteInput />
      </FormProvider>

      {isLoading ? (
        <Loader />
      ) : (
        <Suspense>
          <Products products={filtered} search="" />
        </Suspense>
      )}

      <Outlet />
    </>
  )
}
