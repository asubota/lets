import { FC, lazy, Suspense } from 'react'
import { useIsLoading } from '../../use-data.ts'
import { Loader } from '../../components/loader.tsx'
import { Outlet } from '@tanstack/react-router'
import { useFavoriteItems } from './use-favorite-items.ts'
import { FavoriteInput } from './favorite-input.tsx'
const List2 = lazy(() => import('../../components/list.tsx'))

export const Favorites: FC = () => {
  const list = useFavoriteItems()
  const isLoading = useIsLoading()

  return (
    <>
      <FavoriteInput />

      {isLoading ? (
        <Loader />
      ) : (
        <Suspense>
          <List2 list={list} search="" />
        </Suspense>
      )}

      <Outlet />
    </>
  )
}
