'use client'

import { useLanguage } from '@/contexts/language-context'
import { planets, zodiacSigns, mockDailyTransits } from '@/lib/astrology'
import type { Language } from '@/lib/translations'

interface PlanetCardProps {
  planetId: string
  sign: string
  degree: number
  retrograde?: boolean
}

export function PlanetCard({ planetId, sign, degree, retrograde }: PlanetCardProps) {
  const { language } = useLanguage()
  
  const planet = planets.find(p => p.id === planetId)
  const zodiac = zodiacSigns.find(z => z.id === sign)
  const transit = mockDailyTransits.find(t => t.planet === planetId)
  
  if (!planet || !zodiac) return null

  return (
    <div className="glass rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="planet-symbol text-2xl">{planet.symbol}</span>
          <span className="text-xs text-muted-foreground mt-1">{planet.name}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="zodiac-symbol text-lg">{zodiac.symbol}</span>
            <span className="text-cream font-medium">
              {degree}°
              {retrograde && <span className="text-primary ml-1">℞</span>}
            </span>
          </div>
          
          {transit && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2 group-hover:line-clamp-none transition-all">
              {transit.description[language as Language]}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
