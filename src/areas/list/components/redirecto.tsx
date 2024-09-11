import { FC, useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { SearchForm } from '../../../types.ts'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/')

export const Redirecto: FC<{
  setValue: UseFormSetValue<SearchForm>
  setSearch(value: string): void
}> = ({ setValue, setSearch }) => {
  const { s } = route.useSearch()
  const navigate = route.useNavigate()

  useEffect(() => {
    if (s?.length) {
      navigate({ to: '/' }).then(() => {
        setValue('input', s)
        setSearch(s)
      })
    }
  }, [setValue, navigate, setSearch, s])

  return null
}
