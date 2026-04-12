import { lazy, Suspense } from 'react'

import { Outlet } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'

import { FavoriteInput, type FavoriteInputForm } from './favorite-input.tsx'
import { useFavoriteItems } from './use-favorite-items.ts'
import { ProductsSkeleton } from '../../components/products-skeleton.tsx'
import { filterBySearch } from '../../tools.tsx'
import { type FavoriteProduct } from '../../types.ts'

const Products = lazy(() => import('../../components/products.tsx'))

const getFiltered = (search: string, data: FavoriteProduct[]): FavoriteProduct[] => {
  const lowerCaseSearch = search.toLowerCase()

  return data.filter((item) => filterBySearch(item, lowerCaseSearch))
}

export const Favorites = () => {
  const methods = useForm<FavoriteInputForm>({ defaultValues: { sku: '' } })
  const sku = methods.watch('sku')
  const favoriteItems = useFavoriteItems()
  const filteredItems = getFiltered(sku, favoriteItems)

  return (
    <>
      <FormProvider {...methods}>
        <FavoriteInput />
      </FormProvider>

      <Suspense fallback={<ProductsSkeleton />}>
        <Products products={filteredItems} search="" hasFavoritesSorting isFavoritePage />
      </Suspense>

      <Outlet />
    </>
  )
}
