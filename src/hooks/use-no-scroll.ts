import { useEffect } from 'react'

export const useNoScroll = () => {
  useEffect(() => {
    const root = document.querySelector('#root')

    document.body.classList.add('no-scroll')
    root?.classList.add('no-root')

    return () => {
      document.body.classList.remove('no-scroll')
      root?.classList.remove('no-root')
    }
  }, [])
}
