'use client'

import { Sparkles, Sun, ArrowUp, Compass } from 'lucide-react'

interface Planet {
  name: string
  sign: string
  degree: number
  house: number
  retrograde?: boolean
}

interface House {
  number: number
  sign: string
  degree: number
}

interface NatalChartResultProps {
  chartData: {
    name?: string
    birthDate?: string
    birthTime?: string
    location?: {
      city?: string
      country?: string
      lat?: number
      lon?: number
    }
    ascendant?: { sign: string; degree: number }
    mc?: { sign: string; degree: number }
    planets?: Planet[]
    houses?: House[]
  }
  userName: string
}

const ZODIAC_SYMBOLS: Record<string, string> = {
  bélier: '♈', taureau: '♉', gémeaux: '♊', cancer: '♋',
  lion: '♌', vierge: '♍', balance: '♎', scorpion: '♏',
  sagittaire: '♐', capricorne: '♑', verseau: '♒', poissons: '♓',
  aries: '♈', taurus: '♉', gemini: '♊',
  leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
  sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
}

const ZODIAC_COLORS: Record<string, string> = {
  bélier: 'from-orange-600 to-red-600', taureau: 'from-emerald-700 to-green-600',
  gémeaux: 'from-yellow-500 to-amber-500', cancer: 'from-slate-400 to-blue-300',
  lion: 'from-amber-600 to-orange-500', vierge: 'from-teal-600 to-emerald-600',
  balance: 'from-rose-400 to-pink-500', scorpion: 'from-red-900 to-red-600',
  sagittaire: 'from-indigo-600 to-purple-600', capricorne: 'from-neutral-700 to-slate-800',
  verseau: 'from-blue-600 to-cyan-500', poissons: 'from-violet-500 to-indigo-500',
}

const PLANET_ICONS: Record<string, string> = {
  soleil: '☉', sun: '☉', lune: '☽', moon: '☽', mercure: '☿', mercury: '☿',
  vénus: '♀', venus: '♀', mars: '♂', jupiter: '♃', saturne: '♄', saturn: '♄',
  uranus: '♅', neptune: '♆', pluton: '♇', pluto: '♇',
}

function getZodiacSymbol(sign: string): string {
  if (!sign) return '✦'
  const key = sign.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return ZODIAC_SYMBOLS[key] || '✦'
}

function getZodiacColor(sign: string): string {
  if (!sign) return 'from-amber-500/20 to-amber-600/20'
  const key = sign.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return ZODIAC_COLORS[key] || 'from-amber-500/20 to-amber-600/20'
}

function getPlanetIcon(name: string): string {
  const key = name?.toLowerCase()
  return PLANET_ICONS[key] || '•'
}

function formatDegree(degree: number): string {
  return typeof degree === 'number' ? degree.toFixed(1) : '0.0'
}

export default function NatalChartResult({ chartData, userName }: NatalChartResultProps) {
  if (!chartData) return null

  const { ascendant, mc, planets, houses, birthDate, birthTime, location } = chartData
  const sunPlanet = planets?.find(p => ['soleil', 'sun'].includes(p.name?.toLowerCase()))

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto pb-20">

      {/* En-tête Style Luxe */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-serif text-white tracking-[0.2em] font-light uppercase">
          {userName}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-[0.3em] text-amber-500/80">
          {birthDate && <span className="flex items-center gap-2 border-r border-white/10 pr-6">📅 {birthDate}</span>}
          {birthTime && <span className="flex items-center gap-2 border-r border-white/10 pr-6">🕐 {birthTime}</span>}
          {location?.city && <span className="flex items-center gap-2">📍 {location.city}</span>}
        </div>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8" />
      </div>

      {/* Les 3 Piliers (Soleil, Ascendant, MC) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Signe Solaire */}
        <div className="group relative bg-black/40 border border-white/5 p-10 text-center transition-all duration-500 hover:border-amber-500/40">
          <div className={`absolute inset-0 bg-gradient-to-b ${getZodiacColor(sunPlanet?.sign || '')} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
          <div className="relative z-10 space-y-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 group-hover:text-amber-500 transition-colors">Votre Essence</p>
            <div className="text-7xl font-light text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {getZodiacSymbol(sunPlanet?.sign || '')}
            </div>
            <div>
              <h3 className="text-2xl font-serif tracking-widest text-white uppercase">{sunPlanet?.sign || '—'}</h3>
              <p className="text-[10px] tracking-widest text-amber-600 mt-2">SIGNE SOLAIRE • {formatDegree(sunPlanet?.degree || 0)}°</p>
            </div>
          </div>
        </div>

        {/* Ascendant */}
        <div className="group relative bg-black/40 border border-white/5 p-10 text-center transition-all duration-500 hover:border-purple-500/40">
          <div className={`absolute inset-0 bg-gradient-to-b ${getZodiacColor(ascendant?.sign || '')} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
          <div className="relative z-10 space-y-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 group-hover:text-purple-500 transition-colors">Votre Apparence</p>
            <div className="text-7xl font-light text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {getZodiacSymbol(ascendant?.sign || '')}
            </div>
            <div>
              <h3 className="text-2xl font-serif tracking-widest text-white uppercase">{ascendant?.sign || '—'}</h3>
              <p className="text-[10px] tracking-widest text-purple-600 mt-2">ASCENDANT • {formatDegree(ascendant?.degree || 0)}°</p>
            </div>
          </div>
        </div>

        {/* MC */}
        <div className="group relative bg-black/40 border border-white/5 p-10 text-center transition-all duration-500 hover:border-blue-500/40">
          <div className={`absolute inset-0 bg-gradient-to-b ${getZodiacColor(mc?.sign || '')} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
          <div className="relative z-10 space-y-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 group-hover:text-blue-500 transition-colors">Votre Destinée</p>
            <div className="text-7xl font-light text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {getZodiacSymbol(mc?.sign || '')}
            </div>
            <div>
              <h3 className="text-2xl font-serif tracking-widest text-white uppercase">{mc?.sign || '—'}</h3>
              <p className="text-[10px] tracking-widest text-blue-600 mt-2">MILIEU DU CIEL • {formatDegree(mc?.degree || 0)}°</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait Textuel Raffiné */}
      <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/5 p-12 text-center space-y-6">
        <Sparkles className="h-6 w-6 text-amber-500/50 mx-auto" />
        <h3 className="text-xl font-serif tracking-[0.2em] text-white uppercase">Analyse Cosmique</h3>
        <p className="text-gray-400 font-light leading-[2] tracking-wide text-sm">
          Votre voyage terrestre est guidé par l'énergie du <span className="text-white border-b border-amber-500/30">{sunPlanet?.sign || '—'}</span>.
          Le monde vous perçoit à travers le prisme de votre Ascendant <span className="text-white border-b border-purple-500/30">{ascendant?.sign || '—'}</span>,
          tandis que votre accomplissement se dessine sous les cieux du <span className="text-white border-b border-blue-500/30">{mc?.sign || '—'}</span>.
        </p>
      </div>

      {/* Planètes et Maisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {planets && planets.length > 0 && (
          <div className="bg-black/20 border border-white/5 p-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-8 border-b border-white/5 pb-4">Positions Célestes</h4>
            <div className="space-y-4">
              {planets.map((p) => (
                <div key={p.name} className="flex justify-between items-center text-xs tracking-widest group">
                  <span className="text-gray-500 group-hover:text-white transition-colors">{getPlanetIcon(p.name)} {p.name}</span>
                  <span className="text-white/80">{getZodiacSymbol(p.sign)} {p.sign} {formatDegree(p.degree)}°</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {houses && houses.length > 0 && (
          <div className="bg-black/20 border border-white/5 p-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-8 border-b border-white/5 pb-4">Architecture des Maisons</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {houses.slice(0, 12).map((h) => (
                <div key={h.number} className="flex justify-between items-center text-[10px] tracking-widest border-b border-white/5 pb-2">
                  <span className="text-gray-500">Maison {h.number}</span>
                  <span className="text-white/80">{h.sign} {formatDegree(h.degree)}°</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}