import { type FC, useEffect } from 'react'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { type UseFormSetValue } from 'react-hook-form'

import { type SearchForm } from '../../../types.ts'

export const Redirecto: FC<{
  setValue: UseFormSetValue<SearchForm>
  setSearch(value: string): void
}> = ({ setValue, setSearch }) => {
  const { s } = useSearch({ from: '/_layout/list' })
  const navigate = useNavigate()

  useEffect(() => {
    if (s?.length) {
      navigate({ to: '/list' }).then(() => {
        setValue('input', s)
        setSearch(s)
      })
    }
  }, [setValue, navigate, setSearch, s])

  return null
}
