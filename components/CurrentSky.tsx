'use client'

import { useEffect, useState } from 'react'
import { Cloud, Mail } from 'lucide-react'

const getZodiacSymbol = (sign: string): string => {
  const symbols: Record<string, string> = {
    bélier: '♈', taureau: '♉', gémeaux: '♊', cancer: '♋',
    lion: '♌', vierge: '♍', balance: '♎', scorpion: '♏',
    sagittaire: '♐', capricorne: '♑', verseau: '♒', poissons: '♓',
    aries: '♈', taurus: '♉', gemini: '♊', leo: '♌', virgo: '♍',
    libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑',
    aquarius: '♒', pisces: '♓'
  }
  const key = sign?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return symbols[key] || '✦'
}

export function CurrentSky() {
  const [currentPlanets, setCurrentPlanets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCurrentSky() {
      try {
        const now = new Date()
        const response = await fetch('/api/birth-chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate: now.toISOString().split('T')[0],
            birthTime: now.toTimeString().split(' ')[0].substring(0, 5),
            city: 'Paris',
            country: 'France',
          }),
        })
        const data = await response.json()
        const fastPlanets = data.planets?.filter((p: any) =>
          ['Soleil', 'Lune', 'Mercure', 'Vénus', 'Mars'].includes(p.name)
        )
        setCurrentPlanets(fastPlanets || [])
      } catch (err) {
        console.error('Erreur météo:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCurrentSky()
  }, [])

  // Fonction de scroll optimisée avec décalage
  const scrollToNewsletter = () => {
    const el = document.getElementById('newsletter');
    if (el) {
      const offset = 100; // Espace de sécurité en haut
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse text-gray-500 text-[10px] tracking-widest text-center py-12 uppercase">
        Interprétation du ciel actuel...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-top-4 duration-1000 px-4">
      <div className="bg-black/40 border border-white/5 backdrop-blur-md overflow-hidden rounded-sm">
        {/* Header Statut Live */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <Cloud className="h-4 w-4 text-amber-500" />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white font-light">
              Météo du Ciel Actuel
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[9px] text-amber-500/60 tracking-widest uppercase font-medium">Live</span>
          </div>
        </div>

        {/* Grille des Planètes */}
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {currentPlanets.map((p) => (
              <div key={p.name} className="text-center space-y-3 group">
                <p className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors duration-500">
                  {p.name}
                </p>
                <div className="space-y-1">
                  <div className="text-3xl text-white/90 font-light group-hover:scale-110 transition-transform duration-500">
                    {getZodiacSymbol(p.sign)}
                  </div>
                  <p className="text-[10px] font-serif italic text-amber-500/80 uppercase tracking-tighter">
                    {p.sign}
                  </p>
                </div>
                <p className="text-[8px] text-gray-600 font-mono tracking-tighter">{p.degree?.toFixed(1)}°</p>
              </div>
            ))}
          </div>

          {/* Bouton de redirection */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <button
              onClick={scrollToNewsletter}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all duration-700"
            >
              <Mail className="h-3 w-3 text-amber-500 group-hover:animate-bounce" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 group-hover:text-white">
                Recevoir ma météo personnalisée
              </span>
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-[9px] text-gray-600 mt-4 italic tracking-[0.2em] font-light opacity-50 uppercase">
        Données astronomiques en temps réel • Paris, FR
      </p>
    </div>
  )
}