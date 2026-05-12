'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Footer',
          email: email,
          subject: 'Inscription newsletter footer',
          message: `Inscription depuis le footer : ${email}`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (err) {
      console.error('Erreur inscription newsletter:', err)
    }
  }

  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* À propos */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">Meteo Astrale</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              Votre guide quotidien vers la compréhension cosmique. Découvrez les secrets des étoiles et alignez votre énergie sur le rythme de l'univers.
            </p>
          </div>

          {/* Liens de Navigation */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">Navigation</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <Link href="/" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-amber-400 transition-colors">Accueil</Link>
              <Link href="/carte-natale" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-amber-400 transition-colors">Carte</Link>
              <Link href="/transits" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-amber-400 transition-colors">Transits</Link>
              <Link href="/premium" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-amber-400 transition-colors">Premium</Link>
              <Link href="/contact" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-amber-400 transition-colors">Contact</Link>
              <Link href="/legal" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-amber-400 transition-colors">Légal</Link>
            </div>
          </div>

          {/* Section Newsletter - LA CIBLE DU SCROLL */}
          <div id="newsletter" className="space-y-4 scroll-mt-20">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">Cercle Privé</h4>
            <p className="text-[11px] text-gray-500 font-light">Recevez votre guidance céleste chaque matin.</p>

            {status === 'success' ? (
              <div className="flex items-center gap-2 text-amber-500 text-[10px] uppercase tracking-widest animate-pulse">
                <span>✨</span> Inscription confirmée
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="votre@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-[11px] text-white outline-none focus:border-amber-500/50 transition-all font-light"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : "S'inscrire"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mentions Légales et Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Meteo Astrale • L'élégance céleste
          </p>
          <p className="text-[9px] text-gray-700 italic max-w-md text-center md:text-right">
            L'astrologie est une boussole spirituelle et ne remplace en aucun cas un avis professionnel ou médical.
          </p>
        </div>
      </div>
    </footer>
  )
}