'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
// On importe la liste et le type depuis notre moteur centralisé
import { zodiacSigns, type ZodiacSignId, getZodiacName } from '@/lib/astrology' 
import { HoroscopePanel } from '@/components/horoscope-panel'
import { cn } from '@/lib/utils'

export default function ZodiacSelector() {
  const { language } = useLanguage()
  const [selectedSign, setSelectedSign] = useState<ZodiacSignId | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignSelect = async (signId: ZodiacSignId) => {
    setIsLoading(true)
    setSelectedSign(signId)
    // Simulez un délai de chargement si nécessaire
    await new Promise(resolve => setTimeout(resolve, 100))
    setIsLoading(false)
  }

  // Fonction utilitaire pour obtenir le nom localisé du signe
  const getLocalizedSignName = (signId: string): string => {
    if (language === 'fr') {
      // Supposition : vous avez une fonction pour obtenir le nom français
      // du signe à partir de son identifiant
      return getZodiacName(signId, 'fr')
    }
    // Fallback : capitaliser l'identifiant
    return signId.charAt(0).toUpperCase() + signId.slice(1)
  }

  return (
    <div className="space-y-8">
      {/* Grille des signes */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.id}
            onClick={() => handleSignSelect(sign.id)}
            disabled={isLoading}
            className={cn(
              "p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              selectedSign === sign.id
                ? "bg-amber-500/20 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60"
            )}
          >
            {/* On affiche le symbole ♈, ♉... qu'on a ajouté dans astrology.ts */}
            <span className="text-2xl">{sign.symbol}</span>
            <span className="text-xs font-medium uppercase tracking-wider">
              {/* Nom localisé du signe */}
              {getLocalizedSignName(sign.id)}
            </span>
          </button>
        ))}
      </div>

      {/* Affichage du contenu du signe sélectionné */}
      {selectedSign && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <HoroscopePanel 
            signId={selectedSign} 
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  )
}
