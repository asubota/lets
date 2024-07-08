import { FC, useState } from 'react'
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
import { Box, Container } from '@mui/material'
import { ColorSettingsModal } from './components/color-settings-modal.tsx'

export const Shell: FC = () => {
  const methods = useForm<SearchForm>({
    defaultValues: { input: '' },
  })

  const [search, setSearch] = useState('')
  const { addHistoryItem } = useHistoryActions()
  const list = useSearch(search)
  const favs = useFavs()
  const mode = useAppMode()

  const { resetSearchVendors } = useSearchActions()

  const onSubmit: SubmitHandler<SearchForm> = ({ input }) => {

    console.log('W$W$#$W')
    const term = input.trim()
    resetSearchVendors()
    setSearch(term)
    addHistoryItem(term)
  }

  if (mode === 'scan') {
    return (
      <Scanner
        onSubmit={(input) => {
          methods.setValue('input', input)
          onSubmit({ input })
        }}
      />
    )
  }

  return (
    <Container sx={{ pl: 1, pr: 1, pb: 1 }}>
      <AppBar>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <SearchField
              disabled={mode === 'favs'}
              onSubmit={methods.handleSubmit(onSubmit)}
            />
          </form>
        </FormProvider>
      </AppBar>

      <Box>
        <List list={mode === 'favs' ? favs : list} search={search} />
      </Box>

      <LimitSearchModal list={list} />
      <TableSettingsModal />
      <ColorSettingsModal />
    </Container>
  )
}
