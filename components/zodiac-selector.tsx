'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { zodiacSigns, type ZodiacSignId } from '@/lib/astrology'
import { HoroscopePanel } from '@/components/horoscope-panel'
import { cn } from '@/lib/utils'

export function ZodiacSelector() {
  const { t } = useLanguage()
  const [selectedSign, setSelectedSign] = useState<ZodiacSignId | null>(null)

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-cream mb-2">
          {t.zodiac.title}
        </h2>
        <p className="text-muted-foreground">{t.zodiac.selectSign}</p>
      </div>

      {/* Zodiac Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
        {zodiacSigns.map((sign) => {
          const isSelected = selectedSign === sign.id
          const signName = t.zodiac[sign.id as keyof typeof t.zodiac] as string
          
          return (
            <button
              key={sign.id}
              onClick={() => setSelectedSign(sign.id)}
              className={cn(
                'glass rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-300 min-h-[100px]',
                'hover:border-primary/50 hover:scale-105',
                isSelected && 'border-primary bg-primary/10 scale-105'
              )}
              aria-pressed={isSelected}
            >
              <span className="zodiac-symbol text-3xl">{sign.symbol}</span>
              <span className={cn(
                'text-sm font-medium',
                isSelected ? 'text-primary' : 'text-cream/80'
              )}>
                {signName}
              </span>
              <span className="text-[10px] text-muted-foreground">{sign.dates}</span>
            </button>
          )
        })}
      </div>

      {/* Horoscope Panel */}
      {selectedSign && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <HoroscopePanel signId={selectedSign} />
        </div>
      )}
    </section>
  )
}
