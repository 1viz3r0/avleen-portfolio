import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted editorial typography — no runtime font network calls.
import '@fontsource-variable/fraunces'
import '@fontsource-variable/ibm-plex-sans'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
