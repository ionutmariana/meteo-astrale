'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { zodiacSigns, type ZodiacSignId } from '@/lib/astrology' 
import { HoroscopePanel } from '@/components/horoscope-panel'
import { cn } from '@/lib/utils'

export function ZodiacSelector() {
  const { language } = useLanguage()
  const [selectedSign, setSelectedSign] = useState<ZodiacSignId | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignSelect = async (signId: ZodiacSignId) => {
    setIsLoading(true)
    setSelectedSign(signId)
    // Petit délai pour l'animation de transition
    await new Promise(resolve => setTimeout(resolve, 150))
    setIsLoading(false)
  }

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 tracking-tight">
          Votre Horoscope
        </h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-light">
          Sélectionnez votre signe pour découvrir votre guidance
        </p>
      </div>

      {/* Grille des signes */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.id}
            onClick={() => handleSignSelect(sign.id as ZodiacSignId)}
            disabled={isLoading}
            className={cn(
              "p-6 rounded-sm border transition-all duration-500 flex flex-col items-center gap-3 group",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              selectedSign === sign.id
                ? "bg-amber-500/10 border-amber-500/50 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)] scale-105"
                : "bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            )}
          >
            <span className={cn(
              "text-3xl transition-transform duration-500 group-hover:scale-110",
              selectedSign === sign.id ? "scale-110" : "opacity-60 group-hover:opacity-100"
            )}>
              {sign.symbol}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
              {sign.id}
            </span>
          </button>
        ))}
      </div>

      {/* Affichage du contenu du signe sélectionné */}
      <div className="mt-16 max-w-4xl mx-auto">
        {selectedSign ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <HoroscopePanel signId={selectedSign} />
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/5 opacity-20">
            <p className="text-[10px] uppercase tracking-widest italic">
              En attente de votre signe...
            </p>
          </div>
        )}
      </div>
    </section>
  )
}