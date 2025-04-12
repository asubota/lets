import { FC, lazy, Suspense, useState } from 'react'
import { ClickAwayListener, Portal } from '@mui/material'
import { useIsLoading, useSearch } from '../../use-data.ts'
import { LimitSearchModal, TableSettingsModal } from '../../components'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { SearchForm } from '../../types.ts'
import {
  Redirecto,
  SearchField,
  SearchHistory,
  SearchSuggestions,
} from './components'
import { useSearchActions } from '../../store/search.ts'
import { useHistoryActions } from '../../store'
import { Loader } from '../../components/loader.tsx'
import { Outlet } from '@tanstack/react-router'
import { ExtraViewOptions } from '../../components/extra-view-options.tsx'

const Products = lazy(() => import('../../components/products.tsx'))

export const List: FC = () => {
  const methods = useForm<SearchForm>({ defaultValues: { input: '' } })
  const [search, setSearch] = useState('')
  const products = useSearch(search)
  const { addHistoryItem } = useHistoryActions()
  const { resetSearchVendors } = useSearchActions()
  const [showHistory, setShowHistory] = useState(false)
  const [showAhead, setShowAhead] = useState(false)
  const isLoading = useIsLoading()

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

  return (
    <>
      <Redirecto setValue={methods.setValue} setSearch={setSearch} />

      <Portal container={() => document.getElementById('app-bar-center')}>
        <FormProvider {...methods}>
          <ClickAwayListener onClickAway={hideHints}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <SearchField
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
      </Portal>

      {isLoading ? (
        <Loader />
      ) : (
        <Suspense>
          <Products
            products={products}
            search={search}
            hasPasteIn
            hasGoogle
            hasColumnsConfig
            hasCart
          />
        </Suspense>
      )}

      <LimitSearchModal list={products} />
      <TableSettingsModal />

      <Outlet />

      {products.length === 0 && <ExtraViewOptions />}
    </>
  )
}
