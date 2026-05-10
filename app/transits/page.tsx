'use client'

import { useState, useMemo } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { useAstrologyData } from '@/hooks/use-astrology-api'
import { PlanetCard } from '@/components/planet-card'
import { planets, mockDailyTransits } from '@/lib/astrology'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import type { Language } from '@/lib/translations'

// Generate mock calendar data for the month
function generateMonthTransits(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const transits: Array<{
    day: number
    planet: string
    sign: string
    event: Record<string, string>
  }> = []

  const events = [
    { fr: 'entre en', en: 'enters', es: 'entra en', jp: 'に入る', ro: 'intră în' },
    { fr: 'devient rétrograde en', en: 'goes retrograde in', es: 'se vuelve retrógrado en', jp: 'で逆行', ro: 'devine retrograd în' },
    { fr: 'devient direct en', en: 'goes direct in', es: 'se vuelve directo en', jp: 'で順行', ro: 'devine direct în' },
    { fr: 'conjoint en', en: 'conjuncts in', es: 'conjunta en', jp: 'で合', ro: 'se conjuncționează în' },
  ]

  // Generate some transit events
  for (let i = 0; i < 8; i++) {
    const day = Math.floor(Math.random() * daysInMonth) + 1
    const planetIndex = Math.floor(Math.random() * planets.length)
    const signIndex = Math.floor(Math.random() * 12)
    const eventType = events[Math.floor(Math.random() * events.length)]
    
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
    
    transits.push({
      day,
      planet: planets[planetIndex].id,
      sign: signs[signIndex],
      event: eventType,
    })
  }

  return transits.sort((a, b) => a.day - b.day)
}

export default function TransitsPage() {
  const { t, language } = useLanguage()
  const { data, isLoading } = useAstrologyData()
  const [selectedPlanet, setSelectedPlanet] = useState<string>('all')
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames: Record<Language, string[]> = {
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    jp: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    ro: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
  }

  const monthTransits = useMemo(() => {
    return generateMonthTransits(currentDate.getFullYear(), currentDate.getMonth())
  }, [currentDate])

  const filteredTransits = useMemo(() => {
    if (selectedPlanet === 'all') return data
    return data.filter(transit => transit.planet === selectedPlanet)
  }, [data, selectedPlanet])

  const filteredMonthTransits = useMemo(() => {
    if (selectedPlanet === 'all') return monthTransits
    return monthTransits.filter(transit => transit.planet === selectedPlanet)
  }, [monthTransits, selectedPlanet])

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          {t.transits.title}
        </h1>
      </div>

      {/* Filter */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <span className="text-muted-foreground">{t.transits.filter}:</span>
        <Select value={selectedPlanet} onValueChange={setSelectedPlanet}>
          <SelectTrigger className="w-48 bg-input border-border text-cream">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass">
            <SelectItem value="all">{t.transits.allPlanets}</SelectItem>
            {planets.map((planet) => (
              <SelectItem key={planet.id} value={planet.id}>
                <span className="mr-2">{planet.symbol}</span>
                {planet.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Current Transits */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl text-cream mb-6">{t.transits.title}</h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTransits.map((transit) => (
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

      {/* Monthly Calendar */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-cream">{t.transits.monthly}</h2>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth('prev')}
              className="text-cream hover:bg-violet/30"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <span className="text-cream font-medium min-w-[150px] text-center">
              {monthNames[language as Language][currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth('next')}
              className="text-cream hover:bg-violet/30"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Transit Events */}
        <div className="space-y-3">
          {filteredMonthTransits.length === 0 ? (
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-muted-foreground">No transits for this selection</p>
            </div>
          ) : (
            filteredMonthTransits.map((transit, index) => {
              const planet = planets.find(p => p.id === transit.planet)
              const zodiacNames: Record<string, Record<Language, string>> = {
                aries: { fr: 'Bélier', en: 'Aries', es: 'Aries', jp: '牡羊座', ro: 'Berbec' },
                taurus: { fr: 'Taureau', en: 'Taurus', es: 'Tauro', jp: '牡牛座', ro: 'Taur' },
                gemini: { fr: 'Gémeaux', en: 'Gemini', es: 'Géminis', jp: '双子座', ro: 'Gemeni' },
                cancer: { fr: 'Cancer', en: 'Cancer', es: 'Cáncer', jp: '蟹座', ro: 'Rac' },
                leo: { fr: 'Lion', en: 'Leo', es: 'Leo', jp: '獅子座', ro: 'Leu' },
                virgo: { fr: 'Vierge', en: 'Virgo', es: 'Virgo', jp: '乙女座', ro: 'Fecioară' },
                libra: { fr: 'Balance', en: 'Libra', es: 'Libra', jp: '天秤座', ro: 'Balanță' },
                scorpio: { fr: 'Scorpion', en: 'Scorpio', es: 'Escorpio', jp: '蠍座', ro: 'Scorpion' },
                sagittarius: { fr: 'Sagittaire', en: 'Sagittarius', es: 'Sagitario', jp: '射手座', ro: 'Săgetător' },
                capricorn: { fr: 'Capricorne', en: 'Capricorn', es: 'Capricornio', jp: '山羊座', ro: 'Capricorn' },
                aquarius: { fr: 'Verseau', en: 'Aquarius', es: 'Acuario', jp: '水瓶座', ro: 'Vărsător' },
                pisces: { fr: 'Poissons', en: 'Pisces', es: 'Piscis', jp: '魚座', ro: 'Pești' },
              }
              
              return (
                <div key={index} className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">{transit.day}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-1">
                    <span className="planet-symbol text-xl">{planet?.symbol}</span>
                    <span className="text-cream">{planet?.name}</span>
                    <span className="text-muted-foreground">{transit.event[language as Language]}</span>
                    <span className="text-primary">{zodiacNames[transit.sign][language as Language]}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}
