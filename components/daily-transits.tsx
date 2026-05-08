'use client'

import { useLanguage } from '@/contexts/language-context'
import { useAstrologyData } from '@/hooks/use-astrology-api'
import { PlanetCard } from '@/components/planet-card'
import { Loader2 } from 'lucide-react'

export function DailyTransits() {
  const { t } = useLanguage()
  const { data, isLoading, error } = useAstrologyData()

  return (
    <section className="py-12">
      <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8 text-center">
        {t.transits.title}
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="glass rounded-xl p-6 text-center">
          <p className="text-muted-foreground">{t.common.error}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.slice(0, 6).map((transit) => (
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
