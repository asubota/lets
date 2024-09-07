import React, { FC, useEffect } from 'react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const App: FC = () => {
  useEffect(() => {
    const fn = (event: MessageEvent) => {
      if (event.data && event.data.type === 'navigate') {
        const to: string = event.data.to

        router.navigate({ to })
      }
    }

    navigator.serviceWorker.addEventListener('message', fn)

    return () => {
      navigator.serviceWorker.removeEventListener('message', fn)
    }
  }, [])

  return (
    <React.StrictMode>
      <RouterProvider router={router} basepath="/lets/" />
    </React.StrictMode>
  )
}
