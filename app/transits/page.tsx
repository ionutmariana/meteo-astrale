'use client'

import { useState, useMemo } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { useAstrologyData } from '@/hooks/use-astrology-api'
import { PlanetCard } from '@/components/planet-card'
import { PLANETS, zodiacSigns, getZodiacName, type ZodiacSignId } from '@/lib/astrology'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

const monthNames: Record<string, string[]> = {
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export default function TransitsPage() {
  const { language } = useLanguage()
  const { data, isLoading } = useAstrologyData()
  const [selectedPlanet, setSelectedPlanet] = useState<string>('all')
  const [currentDate, setCurrentDate] = useState(new Date())

  const filteredTransits = useMemo(() => {
    if (!data) return []
    if (selectedPlanet === 'all') return data
    return data.filter((transit: any) => transit.planet === selectedPlanet)
  }, [data, selectedPlanet])

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const months = monthNames[language] || monthNames.en

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          {language === 'fr' ? 'Transits Planétaires' : 'Planetary Transits'}
        </h1>
      </div>

      {/* Filter */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <span className="text-muted-foreground">
          {language === 'fr' ? 'Filtrer :' : 'Filter:'}
        </span>
        <Select value={selectedPlanet} onValueChange={setSelectedPlanet}>
          <SelectTrigger className="w-48 bg-input border-border text-cream">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass">
            <SelectItem value="all">
              {language === 'fr' ? 'Toutes les planètes' : 'All planets'}
            </SelectItem>
            {PLANETS.map((p) => (
              <SelectItem key={p.name} value={p.name}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current Transits */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl text-cream mb-6">
          {language === 'fr' ? 'Aujourd\'hui' : 'Today'}
        </h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : filteredTransits.length === 0 ? (
          <div className="glass rounded-xl p-6 text-center">
            <p className="text-muted-foreground">
              {language === 'fr' ? 'Aucun transit' : 'No transits'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTransits.map((transit: any, i: number) => (
              <PlanetCard
                key={i}
                planetId={transit.planet}
                sign={transit.sign}
                degree={transit.degree}
                retrograde={transit.retrograde}
              />
            ))}
          </div>
        )}
      </section>

      {/* Monthly Calendar */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-cream">
            {language === 'fr' ? 'Calendrier' : 'Calendar'}
          </h2>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')} className="text-cream hover:bg-violet/30">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-cream font-medium min-w-[150px] text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')} className="text-cream hover:bg-violet/30">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="glass rounded-xl p-6 text-center">
          <p className="text-muted-foreground">
            {language === 'fr' ? 'Fonctionnalité à venir' : 'Coming soon'}
          </p>
        </div>
      </section>
    </div>
  )
}