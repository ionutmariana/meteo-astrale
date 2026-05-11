'use client'

import { useLanguage } from '@/contexts/language-context'
import { PLANETS, zodiacSigns } from '@/lib/astrology'

interface PlanetCardProps {
  planetId: string
  sign: string
  degree: number
  retrograde?: boolean
}

export function PlanetCard({ planetId, sign, degree, retrograde }: PlanetCardProps) {
  const { language } = useLanguage()
  
  const planet = PLANETS.find(p => p.name.toLowerCase() === planetId.toLowerCase())
  const zodiac = zodiacSigns.find(z => z.id.toLowerCase() === sign.toLowerCase())
  
  if (!zodiac) return null

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-amber-500/30 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl">{zodiac.symbol}</span>
          <span className="text-xs text-slate-400 mt-1">{planet?.name || planetId}</span>
        </div>
        
        <div className="flex-1">
          <span className="text-slate-200 font-medium">
            {degree.toFixed(1)}° {zodiac.id}
            {retrograde && <span className="text-amber-500 ml-1">℞</span>}
          </span>
        </div>
      </div>
    </div>
  )
}