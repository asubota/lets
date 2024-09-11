import { FC } from 'react'
import { useFavs, useIsLoading } from '../../use-data.ts'
import { Loader } from '../../components/loader.tsx'
import { List } from '../../components'
import { Portal, TextField } from '@mui/material'

export const Favorites: FC = () => {
  const favs = useFavs()
  const isLoading = useIsLoading()

  return (
    <>
      <Portal container={() => document.getElementById('app-bar-center')}>
        <TextField size="small" fullWidth />
      </Portal>

      {isLoading ? <Loader /> : <List list={favs} search="" />}
    </>
  )
}
