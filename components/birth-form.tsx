'use client'

import { useState, useEffect } from 'react'

interface Suggestion {
  place_id: number
  display_name: string
  lat: string
  lon: string
  name?: string
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

  useEffect(() => {
    if (cityQuery.length < 3 || selectedCity) {
      setSuggestions([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityQuery)}&limit=5&addressdetails=1`)
        const data = await res.json()
        setSuggestions(data)
      } catch (err) {
        console.error("Erreur géocodage:", err)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [cityQuery, selectedCity])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCity) {
      alert("Veuillez sélectionner une ville dans la liste suggérée.")
      return
    }

    const addr = selectedCity.address || {}
    const cityName = addr.city || addr.town || addr.village || selectedCity.name || ''
    const countryName = addr.country || ''

    onSubmit({
      name,
      birthDate,
      birthTime,
      city: cityName,
      country: countryName,
      lat: selectedCity.lat,
      lon: selectedCity.lon,
    })
  }

  const handleCitySelect = (suggestion: Suggestion) => {
    setSelectedCity(suggestion)
    setCityQuery(suggestion.display_name)
    setSuggestions([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          {suggestions.length > 0 && !selectedCity && (
            <ul className="absolute z-50 bg-slate-900 border border-white/20 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-2xl">
              {suggestions.map((s) => (
                <li 
                  key={s.place_id}
                  onClick={() => handleCitySelect(s)}
                  className="p-3 hover:bg-white/10 cursor-pointer text-sm text-gray-300 border-b border-white/5 last:border-0"
                >
                  {s.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {selectedCity && (
        <div className="text-sm text-amber-400">
          ✅ {selectedCity.display_name}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isLoading || !selectedCity}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 py-4 rounded-xl font-bold text-white hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-orange-900/20"
      >
        {isLoading ? "Calcul cosmique en cours..." : "Calculer ma Carte Natale"}
      </button>
    </form>
  )
}