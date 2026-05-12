'use client'

import { useState, useEffect } from 'react'

const NOMINATIM_HEADERS = {
  headers: {
    'User-Agent': 'MeteoAstrale/1.0 (irtofan@gmail.com)'
  }
}

interface Suggestion {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address?: {
    city?: string
    town?: string
    village?: string
    country?: string
  }
}

export function BirthForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void, isLoading: boolean }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [cityQuery, setCityQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [selectedCity, setSelectedCity] = useState<Suggestion | null>(null)
  const [geoError, setGeoError] = useState('')
  const [searching, setSearching] = useState(false)

  // 1. Restaurer les données sauvegardées au chargement
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem('lastBirthData')
      if (saved) {
        const data = JSON.parse(saved)
        setName(data.name || '')
        setEmail(data.email || '')
        setBirthDate(data.birthDate || '')
        setBirthTime(data.birthTime || '')
        if (data.cityQuery) setCityQuery(data.cityQuery)
        if (data.selectedCity) setSelectedCity(data.selectedCity)
      }
    } catch (err) {
      console.warn('Erreur restoration:', err)
    }
  }, [])

  // 2. Recherche de ville avec Debounce
  useEffect(() => {
    if (cityQuery.length < 3 || selectedCity) {
      setSuggestions([])
      return
    }

    const timer = setTimeout(async () => {
      setSearching(true)
      setGeoError('')
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityQuery)}&limit=5&addressdetails=1`,
          NOMINATIM_HEADERS
        )
        const data = await res.json()
        if (!data || data.length === 0) {
          setGeoError('Aucune ville trouvée.')
        } else {
          setSuggestions(data)
        }
      } catch (err) {
        setGeoError('Erreur de connexion.')
      } finally {
        setSearching(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [cityQuery, selectedCity])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCity) {
      setGeoError('Sélectionnez une ville dans la liste.')
      return
    }

    const addr = selectedCity.address || {}
    const cityName = addr.city || addr.town || addr.village || cityQuery.split(',')[0].trim()
    const countryName = addr.country || ''

    const birthData = {
      name,
      email,
      birthDate,
      birthTime,
      city: cityName,
      country: countryName,
      lat: selectedCity.lat,
      lon: selectedCity.lon,
    }

    // Sauvegarde locale pour la prochaine visite
    localStorage.setItem('lastBirthData', JSON.stringify({ ...birthData, cityQuery, selectedCity }))

    // A. Déclencher l'affichage de la carte natale (logique parente)
    onSubmit(birthData)

    // B. Envoyer toutes les données à Brevo via votre API corrigée
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...birthData,
          subject: 'Nouveau profil astral créé',
          message: `Calcul effectué pour ${name}.`
        }),
      })
    } catch (err) {
      console.error('Erreur lors de l\'envoi Brevo:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl">
      {/* Prénom & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">Prénom</label>
          <input 
            type="text" required value={name} placeholder="Votre prénom"
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500/50 outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">Email</label>
          <input 
            type="email" required value={email} placeholder="votre@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500/50 outline-none transition-all"
          />
        </div>
      </div>

      {/* Lieu de naissance */}
      <div className="relative">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">Lieu de naissance</label>
        <input 
          type="text" required value={cityQuery} placeholder="Ville, Pays..."
          onChange={(e) => { setCityQuery(e.target.value); setSelectedCity(null); }}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500/50 outline-none transition-all"
        />
        {searching && <div className="absolute right-3 top-11 animate-pulse text-amber-500 text-xs">Recherche...</div>}
        
        {suggestions.length > 0 && !selectedCity && (
          <ul className="absolute z-50 bg-slate-900 border border-white/10 rounded-xl mt-1 w-full max-h-48 overflow-y-auto shadow-2xl">
            {suggestions.map((s) => (
              <li key={s.place_id} onClick={() => { setSelectedCity(s); setCityQuery(s.display_name); setSuggestions([]); }}
                  className="p-3 hover:bg-amber-500/10 cursor-pointer text-sm text-gray-300 border-b border-white/5 last:border-0 transition-colors">
                {s.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date & Heure */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">Date</label>
          <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500/50 outline-none text-sm"/>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">Heure</label>
          <input type="time" required value={birthTime} onChange={(e) => setBirthTime(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-amber-500/50 outline-none text-sm"/>
        </div>
      </div>

      {/* Bouton de soumission */}
      <button 
        type="submit" disabled={isLoading || !selectedCity}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 py-4 rounded-xl font-bold text-white shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        {isLoading ? 'Calcul Cosmique...' : 'Calculer ma Carte Natale'}
      </button>
      
      {geoError && <p className="text-red-400 text-center text-xs mt-2">{geoError}</p>}
    </form>
  )
}