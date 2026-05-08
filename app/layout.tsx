import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/contexts/language-context'
import { AuthProvider } from '@/contexts/auth-context'
import { StarsBackground } from '@/components/stars-background'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { DesktopSidebar } from '@/components/desktop-sidebar'
import { Footer } from '@/components/footer'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Meteo Astrale - Votre Guide Astrologique Quotidien',
  description: 'Découvrez les secrets des étoiles avec Meteo Astrale. Horoscopes personnalisés, carte natale, transits planétaires et plus encore.',
  keywords: ['astrologie', 'horoscope', 'carte natale', 'transits', 'zodiac', 'astrology'],
  authors: [{ name: 'Meteo Astrale' }],
  openGraph: {
    title: 'Meteo Astrale - Votre Guide Astrologique Quotidien',
    description: 'Découvrez les secrets des étoiles avec Meteo Astrale.',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F0C29',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen`}>
        <AuthProvider>
          <LanguageProvider>
            <StarsBackground />
            <Header />
            <DesktopSidebar />
            
            <main className="min-h-screen pb-20 lg:pb-0 lg:pl-64 lg:pt-16">
              {children}
            </main>
            
            <div className="lg:pl-64">
              <Footer />
            </div>
            
            <MobileNav />
          </LanguageProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
