'use client'

import { useLanguage } from '@/contexts/language-context'
// Correction des imports pour correspondre au nouveau lib/astrology.ts
import { PLANETS, zodiacSigns, mockDailyTransits } from '@/lib/astrology'
import type { Language } from '@/lib/translations'

interface PlanetCardProps {
  planetId: string
  sign: string
  degree: number
  retrograde?: boolean
}

export function PlanetCard({ planetId, sign, degree, retrograde }: PlanetCardProps) {
  const { language } = useLanguage()
  
  // On cherche dans PLANETS (majuscules) et on compare avec le nom ou l'ID
  const planet = PLANETS.find(p => p.name.toLowerCase() === planetId.toLowerCase())
  const zodiac = zodiacSigns.find(z => z.id.toLowerCase() === sign.toLowerCase())
  
  // On sécurise la recherche de transit
  const transit = (mockDailyTransits as any[])?.find(t => t.planet === planetId)
  
  // Si on ne trouve pas la planète ou le signe, on affiche une version simplifiée 
  // au lieu de faire planter toute la page
  if (!zodiac) return null

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-amber-500/30 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          {/* On affiche le nom de la planète si l'objet planet n'est pas trouvé */}
          <span className="text-2xl text-amber-500">{planetId.charAt(0).toUpperCase()}</span>
          <span className="text-xs text-slate-400 mt-1">{planet?.name || planetId}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg text-amber-200">{zodiac.symbol}</span>
            <span className="text-slate-200 font-medium">
              {degree}° {sign}
              {retrograde && <span className="text-amber-500 ml-1">℞</span>}
            </span>
          </div>
          
          {transit && transit.description && (
            <p className="text-sm text-slate-400 mt-2 line-clamp-2 group-hover:line-clamp-none transition-all">
              {transit.description[language as Language] || transit.description['fr']}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}