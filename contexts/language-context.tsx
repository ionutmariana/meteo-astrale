'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Language, type TranslationType } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: TranslationType // <-- AJOUT CRITIQUE
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialisation stable pour le rendu serveur
  const [language, setLanguageState] = useState<Language>('fr')

  // t est calculé ici : si language n'est pas prêt, on force 'fr'
  const t = translations[language] || translations.fr

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
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  
  // SÉCURITÉ POUR LE BUILD : Si le hook est appelé hors du Provider 
  // (ce qui arrive souvent pendant le prerendering de Vercel)
  if (!context) {
    return {
      language: 'fr' as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: translations.fr
    }
  }
  
  return context
}