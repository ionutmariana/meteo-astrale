'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { getSign } from '@/lib/astrology' // On garde getSign si besoin
import { HoroscopePanel } from '@/components/horoscope-panel'
import { cn } from '@/lib/utils'

// On définit la liste ici localement pour ne plus dépendre de l'export manquant dans astrology.ts
const zodiacSigns = [
  { id: 'aries', name: { fr: 'Bélier', en: 'Aries' } },
  { id: 'taurus', name: { fr: 'Taureau', en: 'Taurus' } },
  { id: 'gemini', name: { fr: 'Gémeaux', en: 'Gemini' } },
  { id: 'cancer', name: { fr: 'Cancer', en: 'Cancer' } },
  { id: 'leo', name: { fr: 'Lion', en: 'Leo' } },
  { id: 'virgo', name: { fr: 'Vierge', en: 'Virgo' } },
  { id: 'libra', name: { fr: 'Balance', en: 'Libra' } },
  { id: 'scorpio', name: { fr: 'Scorpion', en: 'Scorpio' } },
  { id: 'sagittarius', name: { fr: 'Sagittaire', en: 'Sagittarius' } },
  { id: 'capricorn', name: { fr: 'Capricorne', en: 'Capricorn' } },
  { id: 'aquarius', name: { fr: 'Verseau', en: 'Aquarius' } },
  { id: 'pisces', name: { fr: 'Poissons', en: 'Pisces' } },
]

export default function ZodiacSelector() {
  const { language } = useLanguage()
  const [selectedSign, setSelectedSign] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.id}
            onClick={() => setSelectedSign(sign.id)}
            className={cn(
              "p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2",
              selectedSign === sign.id
                ? "bg-amber-500/20 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60"
            )}
          >
            <span className="text-sm font-medium">
              {language === 'fr' ? sign.name.fr : sign.name.en}
            </span>
          </button>
        ))}
      </div>

      {selectedSign && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <HoroscopePanel signId={selectedSign} />
        </div>
      )}
    </div>
  )
}
