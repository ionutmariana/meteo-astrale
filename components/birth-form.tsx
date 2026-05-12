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
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [cityQuery, setCityQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [selectedCity, setSelectedCity] = useState<Suggestion | null>(null)
  const [geoError, setGeoError] = useState('')

  // Précharger les données sauvegardées
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lastBirthData')
      if (saved) {
        const data = JSON.parse(saved)
        setName(data.name || '')
        setBirthDate(data.birthDate || '')
        setBirthTime(data.birthTime || '')
        if (data.cityQuery) setCityQuery(data.cityQuery)
        if (data.selectedCity) setSelectedCity(data.selectedCity)
      }
    } catch {
      // Ignorer les erreurs de parsing
    }
  }, [])

  // Recherche de ville avec debounce
  useEffect(() => {
    if (cityQuery.length < 3 || selectedCity) {
      setSuggestions([])
      setGeoError('')
      return
    }

    const timer = setTimeout(async () => {
      try {
        setGeoError('')
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityQuery)}&limit=5&addressdetails=1`,
          NOMINATIM_HEADERS
        )
        const data = await res.json()

        if (!data || data.length === 0) {
          setGeoError('Aucune ville trouvée. Essayez un autre nom.')
          setSuggestions([])
        } else {
          setSuggestions(data)
        }
      } catch (err) {
        console.error('Erreur géocodage:', err)
        setGeoError('Erreur de connexion. Réessayez.')
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [cityQuery, selectedCity])

  const handleSelectCity = (suggestion: Suggestion) => {
    setSelectedCity(suggestion)
    setCityQuery(suggestion.display_name)
    setSuggestions([])
    setGeoError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCity) {
      setGeoError('Veuillez sélectionner une ville dans la liste.')
      return
    }

    const addr = selectedCity.address || {}
    const cityName = addr.city || addr.town || addr.village || cityQuery.split(',')[0].trim()
    const countryName = addr.country || ''

    const birthData = {
      name,
      birthDate,
      birthTime,
      city: cityName,
      country: countryName,
      lat: selectedCity.lat,
      lon: selectedCity.lon,
    }

    // Sauvegarder pour la prochaine visite
    try {
      localStorage.setItem('lastBirthData', JSON.stringify({
        ...birthData,
        cityQuery,
        selectedCity,
      }))
    } catch {
      // Ignorer
    }

    onSubmit(birthData)
  }

  // Formater l'affichage : "Bucharest, Romania" au lieu du nom complet
  const formatSuggestion = (s: Suggestion): string => {
    const addr = s.address || {}
    const city = addr.city || addr.town || addr.village || ''
    const country = addr.country || ''
    if (city && country) return `${city}, ${country}`
    if (city) return city
    return s.display_name.split(',').slice(0, 2).join(', ')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prénom */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Prénom</label>
          <input 
            type="text" 
            required
            value={name}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Ville de naissance */}
        <div className="relative">
          <label className="text-sm text-gray-400 block mb-2">Ville de naissance</label>
          <input 
            type="text" 
            required
            value={cityQuery}
            placeholder="Cherchez une ville..."
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors"
            onChange={(e) => {
              setCityQuery(e.target.value)
              setSelectedCity(null)
            }}
          />
          
          {/* Suggestions */}
          {suggestions.length > 0 && !selectedCity && (
            <ul className="absolute z-50 bg-slate-900 border border-white/20 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-2xl">
              {suggestions.map((s) => (
                <li 
                  key={s.place_id}
                  onClick={() => handleSelectCity(s)}
                  className="p-3 hover:bg-white/10 cursor-pointer text-sm text-gray-300 border-b border-white/5 last:border-0"
                >
                  {formatSuggestion(s)}
                </li>
              ))}
            </ul>
          )}

          {/* Message d'erreur géocodage */}
          {geoError && (
            <p className="text-red-400 text-xs mt-1">{geoError}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date de naissance */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Date de naissance</label>
          <input 
            type="date" 
            required
            value={birthDate}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        {/* Heure de naissance */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Heure de naissance</label>
          <input 
            type="time" 
            required
            value={birthTime}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
            onChange={(e) => setBirthTime(e.target.value)}
          />
        </div>
      </div>

      {/* Ville sélectionnée */}
      {selectedCity && (
        <div className="text-sm text-amber-400 flex items-center gap-2">
          ✅ {formatSuggestion(selectedCity)}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isLoading || !selectedCity}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 py-4 rounded-xl font-bold text-white hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-orange-900/20"
      >
        {isLoading ? 'Calcul cosmique en cours...' : 'Calculer ma Carte Natale'}
      </button>
    </form>
  )
}