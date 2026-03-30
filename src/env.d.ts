/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_SANITY_DATASET: string
  readonly VITE_SANITY_PROJECT_ID: string
  readonly VITE_SANITY_API_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SANITY_DATASET: string
      SANITY_PROJECT_ID: string
      SANITY_API_VERSION: string
    }
  }
}

export {}
