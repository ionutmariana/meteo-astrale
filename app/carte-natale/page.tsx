'use client'

import React from 'react'
import { CurrentSky } from '@/components/CurrentSky'
import { DailyTransits } from '@/components/daily-transits'
import { ZodiacSelector } from '@/components/zodiac-selector'
import { Footer } from '@/components/footer'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
      
      {/* 1. Widget Météo du Ciel - Positionné en haut pour l'impact visuel */}
      <section className="pt-32 pb-10">
        <CurrentSky />
      </section>

      {/* 2. Section Hero principale */}
      <main className="container mx-auto px-4 text-center space-y-8 pb-16">
        <div className="space-y-4 animate-in fade-in zoom-in duration-1000">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter text-white">
            Meteo Astrale
          </h1>
          <p className="text-amber-500/80 uppercase tracking-[0.5em] text-[10px] md:text-xs font-light">
            Découvrez les secrets des étoiles
          </p>
        </div>

        <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed font-light tracking-wide">
          Votre guide quotidien vers la compréhension cosmique. Explorez vos transits 
          planétaires, votre carte natale et recevez des horoscopes personnalisés.
        </p>

        {/* Boutons d'appel à l'action */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/carte-natale" 
            className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-sm flex items-center gap-2 transition-all group"
          >
            <span className="text-[11px] uppercase font-bold tracking-widest text-black">
              Découvrir mon horoscope
            </span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          
          <Link 
            href="/premium" 
            className="bg-transparent border border-white/10 hover:border-amber-500/50 px-8 py-4 rounded-sm flex items-center gap-2 transition-all"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-[11px] uppercase font-bold tracking-widest">
              Passer Premium
            </span>
          </Link>
        </div>
      </main>

      {/* 3. Section des Transits du Jour */}
      <DailyTransits />

      {/* 4. Sélecteur de Signes du Zodiaque */}
      <ZodiacSelector />

      {/* 5. Footer (Contient l'ID #newsletter pour le scroll fluide) */}
      <Footer />
      
    </div>
  )
}