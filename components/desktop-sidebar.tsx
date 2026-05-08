'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { useAuth } from '@/contexts/auth-context'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Star, 
  Calendar, 
  Crown, 
  Mail, 
  Sparkles,
  FileText,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

const mainNavItems = [
  { href: '/', icon: Home, labelKey: 'home' as const },
  { href: '/carte-natale', icon: Star, labelKey: 'natalChart' as const },
  { href: '/transits', icon: Calendar, labelKey: 'transits' as const },
  { href: '/premium', icon: Crown, labelKey: 'premium' as const },
  { href: '/contact', icon: Mail, labelKey: 'contact' as const },
]

const legalNavItems = [
  { href: '/legal', icon: FileText, labelKey: 'legal' as const },
  { href: '/privacy', icon: Shield, labelKey: 'privacy' as const },
]

export function DesktopSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { isPremium, upgradeToPremium } = useAuth()

  return (
    <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 glass border-r border-border/50 flex-col z-40">
      <div className="flex-1 py-6 px-4 overflow-y-auto">
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 h-11',
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-cream/70 hover:text-cream hover:bg-violet/30'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {t.nav[item.labelKey]}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="my-6 border-t border-border/50" />

        {/* Legal Links */}
        <nav className="space-y-1">
          {legalNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-3 h-9 text-sm',
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-cream hover:bg-violet/30'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t.nav[item.labelKey]}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <LanguageSwitcher />
        </div>

        {!isPremium && (
          <Button className="btn-gold w-full h-11" onClick={upgradeToPremium}>
            <Sparkles className="mr-2 h-4 w-4" />
            {t.hero.premiumCta}
          </Button>
        )}
      </div>
    </aside>
  )
}
