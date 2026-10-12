import { useEffect } from 'react'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { type UseFormSetValue } from 'react-hook-form'

import { type SearchForm } from '../../../types.ts'

export const Redirecto = ({
  setValue,
  setSearch,
}: {
  setValue: UseFormSetValue<SearchForm>
  setSearch: (value: string) => void
}) => {
  const { s } = useSearch({ from: '/_layout/list' })
  const navigate = useNavigate()

  useEffect(() => {
    if (!s?.length) {
      return
    }

    const redirect = async () => {
      await navigate({ to: '/list' })
      setValue('input', s)
      setSearch(s)
    }
    void redirect()
  }, [setValue, navigate, setSearch, s])

  return null
}
