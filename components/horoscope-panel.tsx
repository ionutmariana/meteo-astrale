'use client'

import { type ZodiacSignId, getZodiacName } from '@/lib/astrology'
import { useLanguage } from '@/contexts/language-context'
import { Heart, Briefcase, Activity, Wallet, Star } from 'lucide-react'

interface HoroscopePanelProps {
  signId: ZodiacSignId
}

const domains = [
  { key: 'love', icon: Heart, color: 'text-pink-400', label: { fr: 'Amour', en: 'Love' } },
  { key: 'work', icon: Briefcase, color: 'text-blue-400', label: { fr: 'Travail', en: 'Work' } },
  { key: 'health', icon: Activity, color: 'text-green-400', label: { fr: 'Santé', en: 'Health' } },
  { key: 'finances', icon: Wallet, color: 'text-amber-400', label: { fr: 'Finances', en: 'Finances' } },
]

export function HoroscopePanel({ signId }: HoroscopePanelProps) {
  const { language } = useLanguage()
  const signName = getZodiacName(signId, language === 'fr' ? 'fr' : 'en')

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl text-cream">
        {language === 'fr' ? `Horoscope ${signName}` : `${signName} Horoscope`}
      </h3>

      <p className="text-sm text-muted-foreground">
        {language === 'fr'
          ? 'Sélectionnez un signe pour découvrir votre horoscope personnalisé.'
          : 'Select a sign to discover your personalized horoscope.'}
      </p>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {domains.map(({ key, icon: Icon, color, label }) => (
          <div key={key} className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="font-medium text-cream">
                {label[language as 'fr' | 'en']}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}