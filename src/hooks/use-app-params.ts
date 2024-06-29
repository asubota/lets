import { useEffect } from 'react'

import { useIdActions } from '../store'

const getQueryParam = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

export const useAppParams = () => {
  const { setId } = useIdActions()

  useEffect(() => {
    const id = getQueryParam('id')

    if (id) {
      setId(id)
      window.location.replace('/')
    }
  }, [setId])
}
