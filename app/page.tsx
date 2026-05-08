import { Hero } from '@/components/hero'
import { DailyTransits } from '@/components/daily-transits'
import { ZodiacSelector } from '@/components/zodiac-selector'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <Hero />
      <DailyTransits />
      <ZodiacSelector />
    </div>
  )
}
