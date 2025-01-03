import { FC, useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { SearchForm } from '../../../types.ts'
import { useNavigate, useSearch } from '@tanstack/react-router'

export const Redirecto: FC<{
  setValue: UseFormSetValue<SearchForm>
  setSearch(value: string): void
}> = ({ setValue, setSearch }) => {
  const { s } = useSearch({ from: '/_layout/' })
  const navigate = useNavigate()

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
