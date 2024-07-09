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
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { SearchForm } from './types.ts'
import { ClickAwayListener, Container } from '@mui/material'
import { ColorSettingsModal } from './components/color-settings-modal.tsx'
import { SearchHistory } from './components/search-history.tsx'
import { SearchSuggestions } from './components/search-suggestions.tsx'

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

  const [showHistory, setShowHistory] = useState(false)
  const [showAhead, setShowAhead] = useState(false)

  const onSubmit: SubmitHandler<SearchForm> = ({ input }) => {
    const term = input.trim()
    resetSearchVendors()
    setSearch(term)
    addHistoryItem(term)
    hideHints()
  }

  const hideHints = () => {
    setShowHistory(false)
    setShowAhead(false)
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
          <ClickAwayListener onClickAway={hideHints}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <SearchField
                disabled={mode === 'favs'}
                onSubmit={methods.handleSubmit(onSubmit)}
                onFocus={() => {
                  setShowHistory(true)
                  setShowAhead(true)
                }}
              />
              <Controller
                name="input"
                control={methods.control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <>
                      <SearchHistory
                        open={showHistory && !value.length}
                        setValue={(v: string) => {
                          hideHints()
                          onChange(v)
                          methods.handleSubmit(onSubmit)()
                        }}
                      />

                      <SearchSuggestions
                        search={value}
                        open={
                          showAhead && value.length >= 3 && search !== value
                        }
                        setValue={(v: string) => {
                          hideHints()
                          onChange(v)
                          methods.handleSubmit(onSubmit)()
                        }}
                      />
                    </>
                  )
                }}
              />
            </form>
          </ClickAwayListener>
        </FormProvider>
      </AppBar>

      <List list={mode === 'favs' ? favs : list} search={search} />

      <LimitSearchModal list={list} />
      <TableSettingsModal />
      <ColorSettingsModal />
    </Container>
  )
}
