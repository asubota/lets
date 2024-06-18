import { FC, useState } from 'react'
import { Box } from '@mui/material'
import {
  SearchField,
  List,
  LimitSearchModal,
  TableSettingsModal,
} from './components'
import { useAppMode, useHistoryActions } from './store'
import { useFavs, useSearch } from './use-data.ts'
import { useSearchActions } from './store/search.ts'
import { AppBar } from './components/app-bar.tsx'
import { Scanner } from './components/scanner.tsx'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { SearchForm } from './types.ts'

export const Shell: FC = () => {
  const methods = useForm<SearchForm>({
    defaultValues: { input: '' },
  })

  const [search, setSearch] = useState('')
  const { add } = useHistoryActions()
  const list = useSearch(search)
  const favs = useFavs()
  const mode = useAppMode()

  const { resetSearchVendors } = useSearchActions()

  const onSubmit: SubmitHandler<SearchForm> = ({ input }) => {
    const term = input.trim()
    resetSearchVendors()
    setSearch(term)

    if (term.length > 2) {
      add(term)
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {mode === 'scan' ? (
            <Scanner onSubmit={methods.handleSubmit(onSubmit)} />
          ) : (
            <SearchField
              disabled={mode === 'favs'}
              onSubmit={methods.handleSubmit(onSubmit)}
            />
          )}
        </form>
      </FormProvider>

      {mode !== 'scan' && (
        <Box sx={{ p: 1, pt: 0 }}>
          <AppBar />
          <List list={mode === 'favs' ? favs : list} search={search} />
          <LimitSearchModal list={list} />
          <TableSettingsModal />
        </Box>
      )}
    </>
  )
}
