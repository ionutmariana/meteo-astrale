'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

export type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

// ------------------------------------------------------------
// CONTEXTE
// ------------------------------------------------------------

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// ------------------------------------------------------------
// PROVIDER
// ------------------------------------------------------------

interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export function LanguageProvider({ 
  children, 
  defaultLanguage = 'fr' 
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialisation depuis le localStorage ou le navigateur
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language') as Language | null
    
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    } else {
      // Détection de la langue du navigateur
      const browserLang = navigator.language.split('-')[0]
      const detectedLanguage = browserLang === 'fr' ? 'fr' : 'en'
      setLanguageState(detectedLanguage)
    }
    
    setIsInitialized(true)
  }, [])

  // Synchronisation avec le localStorage et l'attribut HTML
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('app-language', language)
      document.documentElement.lang = language
      
      // Optionnel : Ajouter une classe pour le ciblage CSS
      document.documentElement.classList.remove('lang-fr', 'lang-en')
      document.documentElement.classList.add(`lang-${language}`)
    }
  }, [language, isInitialized])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'fr' ? 'en' : 'fr')
  }

  // Ne pas rendre les enfants tant que la langue n'est pas initialisée
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-pulse text-slate-400">Chargement...</div>
      </div>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// ------------------------------------------------------------
// HOOK
// ------------------------------------------------------------

export function useLanguage() {
  const context = useContext(LanguageContext)
  
  if (context === undefined) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur d\'un LanguageProvider')
  }
  
  return context
}

// ------------------------------------------------------------
// UTILITAIRES DE TRADUCTION (optionnel)
// ------------------------------------------------------------

type TranslationDict = {
  [key: string]: string | TranslationDict
}

type Translations = {
  fr: TranslationDict
  en: TranslationDict
}

/**
 * Crée un traducteur simple pour les textes statiques
 * @param translations - Objet contenant les traductions
 * @returns Fonction de traduction
 * 
 * @example
 * const t = createTranslator({
 *   fr: { hello: 'Bonjour', welcome: 'Bienvenue' },
 *   en: { hello: 'Hello', welcome: 'Welcome' }
 * })
 * t('hello') // 'Bonjour' si la langue est 'fr'
 */
export function createTranslator(translations: Translations) {
  return function translate(key: string, lang: Language = 'fr'): string {
    const keys = key.split('.')
    let value: any = translations[lang]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback sur l'anglais si la clé n'existe pas
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Retourne la clé si aucune traduction trouvée
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }
}
