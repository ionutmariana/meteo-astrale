'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { Sparkles } from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        {/* Disclaimer */}
        <div className="glass rounded-xl p-4 mb-8">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            {t.footer.disclaimer}
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg text-cream">Meteo Astrale</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/legal" className="text-muted-foreground hover:text-cream transition-colors">
              {t.nav.legal}
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-cream transition-colors">
              {t.nav.privacy}
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-cream transition-colors">
              {t.nav.contact}
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Meteo Astrale. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  )
}
