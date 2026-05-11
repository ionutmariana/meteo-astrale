'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('app-language') as Language
    if (saved === 'fr' || saved === 'en') {
      setLanguageState(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('app-language', language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => setLanguageState(lang)
  const toggleLanguage = () => setLanguageState(prev => prev === 'fr' ? 'en' : 'fr')

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage doit être utilisé dans un LanguageProvider')
  return context
}
