import { createRoot } from 'react-dom/client'

import { App } from './app.tsx'

const root = document.querySelector('#root')
if (!root) {
  throw new Error('#root element not found')
}

createRoot(root).render(<App />)
