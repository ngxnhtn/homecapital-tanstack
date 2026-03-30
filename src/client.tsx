import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { LocalesProvider } from './hooks/locales'

hydrateRoot(
  document,
  <StrictMode>
    <LocalesProvider>
      <StartClient />
    </LocalesProvider>
  </StrictMode>,
)
