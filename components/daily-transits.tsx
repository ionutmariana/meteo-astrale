'use client'

import { useLanguage } from '@/contexts/language-context'
import { useAstrologyData } from '@/hooks/use-astrology-api'
import { PlanetCard } from '@/components/planet-card'
import { Loader2 } from 'lucide-react'

export function DailyTransits() {
  const { t } = useLanguage()
  const { data, isLoading, error } = useAstrologyData()

  // On s'assure que le titre est bien traduit ou on met un fallback
  const title = t?.transits?.title || "Transits Planétaires du Jour"

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="space-y-2 mb-12 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">
          {title}
        </h2>
        <div className="h-px w-24 bg-amber-500/40 mx-auto" />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Alignement des astres...</p>
        </div>
      ) : error ? (
        <div className="bg-white/[0.02] border border-white/5 rounded-sm p-12 text-center">
          <p className="text-gray-500 text-sm font-light italic">
            Les éphémérides ne sont pas accessibles pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* On vérifie que data existe avant de mapper */}
          {data && Array.isArray(data) && data.slice(0, 6).map((transit) => (
            <PlanetCard
              key={transit.planet}
              planetId={transit.planet}
              sign={transit.sign}
              degree={transit.degree}
              retrograde={transit.retrograde}
            />
          ))}
        </div>
      )}
    </section>
  )
}