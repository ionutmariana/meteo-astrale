'use client'

import { useLanguage } from '@/contexts/language-context'
import { mockHoroscopes, type ZodiacSignId } from '@/lib/astrology'
import type { Language } from '@/lib/translations'
import { Heart, Briefcase, Activity, Wallet } from 'lucide-react'

interface HoroscopePanelProps {
  signId: ZodiacSignId
}

const domainIcons = {
  love: Heart,
  work: Briefcase,
  health: Activity,
  finances: Wallet,
}

const domainColors = {
  love: 'text-pink-400',
  work: 'text-blue-400',
  health: 'text-green-400',
  finances: 'text-primary',
}

export function HoroscopePanel({ signId }: HoroscopePanelProps) {
  const { language, t } = useLanguage()
  const horoscope = mockHoroscopes[signId]

  if (!horoscope) return null

  const domains: Array<'love' | 'work' | 'health' | 'finances'> = ['love', 'work', 'health', 'finances']

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl text-cream">{t.domains.title}</h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {domains.map((domain) => {
          const Icon = domainIcons[domain]
          const data = horoscope[domain]
          
          return (
            <div key={domain} className="glass rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`h-5 w-5 ${domainColors[domain]}`} />
                <span className="font-medium text-cream">
                  {t.domains[domain]}
                </span>
              </div>
              
              {/* Score bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{t.domains.rating}</span>
                  <span className="text-primary font-semibold">{data.score}/10</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full transition-all duration-500"
                    style={{ width: `${data.score * 10}%` }}
                  />
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {data.text[language as Language]}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
