'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
// On a supprimé getZodiacName de l'import car il causait l'erreur
import { zodiacSigns, type ZodiacSignId } from '@/lib/astrology' 
import { HoroscopePanel } from '@/components/horoscope-panel'
import { cn } from '@/lib/utils'

export default function ZodiacSelector() {
  const { language } = useLanguage()
  const [selectedSign, setSelectedSign] = useState<ZodiacSignId | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignSelect = async (signId: ZodiacSignId) => {
    setIsLoading(true)
    setSelectedSign(signId)
    // Petit délai pour l'animation de transition
    await new Promise(resolve => setTimeout(resolve, 100))
    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Grille des signes */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.id}
            onClick={() => handleSignSelect(sign.id as ZodiacSignId)}
            disabled={isLoading}
            className={cn(
              "p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              selectedSign === sign.id
                ? "bg-amber-500/20 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60"
            )}
          >
            <span className="text-2xl">{sign.symbol}</span>
            <span className="text-xs font-medium uppercase tracking-wider">
              {/* On affiche l'ID du signe directement pour éviter l'erreur de fonction manquante */}
              {sign.id}
            </span>
          </button>
        ))}
      </div>

      {/* Affichage du contenu du signe sélectionné */}
      {selectedSign && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <HoroscopePanel signId={selectedSign} />
        </div>
      )}
    </div>
  )
}