import { StrictMode, useEffect } from 'react'

import { createRouter, RouterProvider } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen.ts'
import { type AppMessage } from './types.ts'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const App = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent<AppMessage>) => {
      if (event.data.type === 'navigate') {
        const { to, sku } = event.data.payload
        void (to ? router.navigate({ to }) : router.navigate({ to: '/', search: { s: sku } }))
      }
    }

    navigator.serviceWorker.addEventListener('message', handleMessage)

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <StrictMode>
      <RouterProvider router={router} basepath="/lets/" />
    </StrictMode>
  )
}
