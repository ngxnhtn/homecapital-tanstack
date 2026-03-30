import { createContext, useContext, useEffect, useState } from 'react'

import { translation } from '../../translation';
import type { TranslationKey } from '../../translation';

export type LocalesContextValue = 'vi' | 'en'

type LocalesContextProvider = {
  lang: LocalesContextValue
  toggleLang: () => void
  t: (k: TranslationKey) => string
}

export type TranslationText = {
  [key: string]: {
    [K in LocalesContextValue]: string
  }
}

const defaultLang: LocalesContextValue = 'en'

export const LocalesContext = createContext<LocalesContextProvider>({
  lang: 'en',
  toggleLang: () => {},
  t: () => '',
})

export const useLocales = () => useContext(LocalesContext)

export const LocalesProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [lang, setLang] = useState<LocalesContextValue>(defaultLang)

  const toggleLang = () => {
    if (lang == 'vi') {
      setLang('en')
    } else {
      setLang('vi')
    }
  }

  const t = (k: TranslationKey) => translation[k][lang]

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LocalesContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LocalesContext.Provider>
  )
}
