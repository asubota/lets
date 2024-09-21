import { FC, lazy, Suspense } from 'react'
import { useFavs, useIsLoading } from '../../use-data.ts'
import { Loader } from '../../components/loader.tsx'
import { Portal, TextField } from '@mui/material'
import { Outlet } from '@tanstack/react-router'
const List2 = lazy(() => import('../../components/list.tsx'))

export const Favorites: FC = () => {
  const favs = useFavs()
  const isLoading = useIsLoading()

  return (
    <>
      <Portal container={() => document.getElementById('app-bar-center')}>
        <TextField size="small" fullWidth />
      </Portal>

      {isLoading ? (
        <Loader />
      ) : (
        <Suspense>
          <List2 list={favs} search="" />
        </Suspense>
      )}

      <Outlet />
    </>
  )
}
