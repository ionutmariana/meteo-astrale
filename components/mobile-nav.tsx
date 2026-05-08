'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { Home, Star, Calendar, Crown, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', icon: Home, labelKey: 'home' as const },
  { href: '/carte-natale', icon: Star, labelKey: 'natalChart' as const },
  { href: '/transits', icon: Calendar, labelKey: 'transits' as const },
  { href: '/premium', icon: Crown, labelKey: 'premium' as const },
  { href: '/contact', icon: Mail, labelKey: 'contact' as const },
]

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px] min-h-[44px] rounded-lg transition-colors',
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-cream hover:bg-violet/30'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium truncate max-w-[60px]">
                {t.nav[item.labelKey]}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
