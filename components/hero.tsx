'use client'

import { useLanguage } from '@/contexts/language-context'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const { t } = useLanguage()
  const { isPremium } = useAuth()

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet/30 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
      
      <div className="relative text-center max-w-4xl mx-auto px-4">
        {/* Animated Title */}
        <div className="mb-6">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-block">
              {t.hero.title.split('').map((char, i) => (
                <span
                  key={i}
                  className="inline-block animate-in fade-in duration-300"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>
          
          <p className="font-serif text-xl md:text-2xl text-primary animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 leading-relaxed">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
          <Link href="/carte-natale">
            <Button className="btn-gold h-14 px-8 text-lg w-full sm:w-auto">
              {t.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          {!isPremium && (
            <Link href="/premium">
              <Button 
                variant="outline" 
                className="h-14 px-8 text-lg border-primary/50 text-primary hover:bg-primary/10 w-full sm:w-auto"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {t.hero.premiumCta}
              </Button>
            </Link>
          )}
        </div>

        {/* Decorative zodiac symbols */}
        <div className="mt-16 flex items-center justify-center gap-4 text-3xl opacity-30">
          {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => (
            <span
              key={i}
              className="zodiac-symbol animate-in fade-in duration-500"
              style={{ animationDelay: `${800 + i * 100}ms` }}
            >
              {symbol}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
