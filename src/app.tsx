import React, { FC, useEffect } from 'react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import { NotificationData } from './types.ts'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const App: FC = () => {
  useEffect(() => {
    const fn = async (event: MessageEvent<NotificationData>) => {
      if (event.data && event.data.type === 'navigate') {
        const to = event.data.to

        if (to) {
          await router.navigate({ to })
        }

        const sku = event.data.sku
        if (sku) {
          await router.navigate({ to: '/', search: { s: sku } })
        }
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
