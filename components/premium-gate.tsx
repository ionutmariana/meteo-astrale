'use client'

import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface PremiumGateProps {
  children: ReactNode
  fallback?: ReactNode
}

export function PremiumGate({ children, fallback }: PremiumGateProps) {
  const { isPremium } = useAuth()
  const { t } = useLanguage()

  if (isPremium) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {/* Blurred content preview */}
      <div className="blur-md pointer-events-none select-none opacity-50">
        {fallback || children}
      </div>
      
      {/* Premium overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-sm mx-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="font-serif text-2xl text-cream mb-2">
            {t.natalChart.premiumRequired}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {t.natalChart.unlockMessage}
          </p>
          
          <Link href="/premium">
            <Button className="btn-gold w-full h-12 text-base">
              <Sparkles className="mr-2 h-5 w-5" />
              {t.hero.premiumCta}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
