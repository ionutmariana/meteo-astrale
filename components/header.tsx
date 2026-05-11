'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { useAuth } from '@/contexts/auth-context'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Button } from '@/components/ui/button'
import { Sparkles, User, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { t } = useLanguage()
  const { isPremium, logout, upgradeToPremium } = useAuth()

  // SÉCURITÉ : Si t n'est pas encore chargé (pendant le build Vercel), 
  // on affiche un header vide ou on attend pour éviter l'erreur "reading nav of undefined"
  if (!t || !t.nav) {
    return <header className="h-16 lg:flex fixed top-0 left-0 right-0 z-50 glass border-b border-border/50" />
  }

  return (
    <header className="hidden lg:flex fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-serif text-xl text-cream">Meteo Astrale</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Link href="/">
            <Button variant="ghost" className="text-cream/80 hover:text-cream hover:bg-violet/50">
              {t.nav.home}
            </Button>
          </Link>
          <Link href="/carte-natale">
            <Button variant="ghost" className="text-cream/80 hover:text-cream hover:bg-violet/50">
              {t.nav.natalChart}
            </Button>
          </Link>
          <Link href="/transits">
            <Button variant="ghost" className="text-cream/80 hover:text-cream hover:bg-violet/50">
              {t.nav.transits}
            </Button>
          </Link>
          <Link href="/premium">
            <Button variant="ghost" className="text-cream/80 hover:text-cream hover:bg-violet/50">
              {t.nav.premium}
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="text-cream/80 hover:text-cream hover:bg-violet/50">
              {t.nav.contact}
            </Button>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          {!isPremium && (
            <Button className="btn-gold h-9 px-4" onClick={upgradeToPremium}>
              <Sparkles className="mr-2 h-4 w-4" />
              {t.hero.premiumCta}
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-cream/80 hover:text-cream hover:bg-violet/50">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <div className="px-3 py-2 border-b border-border/50">
                <p className="text-sm font-medium text-cream">
                  {isPremium ? t.auth.premiumUser : t.auth.guest}
                </p>
                {isPremium && (
                  <p className="text-xs text-primary">Premium</p>
                )}
              </div>
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                {t.auth.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}