'use client'

import { useRef, useState } from 'react'

type FormState = {
  name: string
  email: string
  birthDate: string
  birthTime: string
  birthCity: string
  lat: string
  lon: string
}

export default function BirthForm({
  onResult,
}: {
  onResult?: (data: any) => void
}) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthCity: '',
    lat: '',
    lon: '',
  })

  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSug, setShowSug] = useState(false)
  const timer = useRef<any>(null)

  async function searchCity(q: string) {
    if (q.length < 3) {
      setSuggestions([])
      setShowSug(false)
      return
    }
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`
    )
    const d = await r.json()
    setSuggestions(Array.isArray(d) ? d : [])
    setShowSug(true)
  }

  const handleCityChange = (v: string) => {
    setForm({ ...form, birthCity: v, lat: '', lon: '' })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => searchCity(v), 500)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.lat || !form.lon) {
      alert('Sélectionne une ville dans la liste.')
      return
    }

    const lonNum = Number(form.lon)
    if (!Number.isFinite(lonNum)) {
      alert('Longitude invalide.')
      return
    }

    const utcOffsetMinutes = Math.round(lonNum / 15) * 60

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      birthDate: form.birthDate,
      birthTime: form.birthTime,
      birthCity: form.birthCity.trim(),
      lat: form.lat,
      lon: form.lon,
      utcOffsetMinutes,
    }

    console.log('[birth-form] POST /api/birth-chart payload:', {
      ...payload,
      email: payload.email ? `${payload.email.slice(0, 2)}…` : '(vide)',
    })

    if (!payload.email) {
      alert('Email obligatoire.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/birth-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store', // 🔥 empêche le cache Vercel
      })

      const data = await res.json()

      console.log('[birth-form] API RESULT:', data) // 🔥 vérifie l’ascendant réel

      if (!res.ok) {
        throw new Error(data?.error || 'Erreur serveur')
      }

      // 🔥🔥🔥 LA LIGNE QUI RÉPARE TOUT 🔥🔥🔥
      // On passe TOUTE la réponse API telle quelle au composant
      onResult?.(data)

    } catch (err) {
      console.error('[birth-form] ERROR:', err)
      alert('Erreur lors du calcul.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3"
        placeholder="Prénom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3"
        type="email"
        inputMode="email"
        autoComplete="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-3"
          type="date"
          value={form.birthDate}
          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          required
        />
        <input
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-3"
          type="time"
          value={form.birthTime}
          onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
          required
        />
      </div>

      <div className="relative">
        <input
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3"
          placeholder="Ville de naissance"
          value={form.birthCity}
          onChange={(e) => handleCityChange(e.target.value)}
          required
        />
        {showSug && suggestions.length > 0 && (
          <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-white/20 bg-[#0d011a] shadow-2xl">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="cursor-pointer border-b border-white/5 p-3 text-sm hover:bg-amber-500/20"
                onClick={() => {
                  setForm({
                    ...form,
                    birthCity: s.display_name,
                    lat: String(s.lat),
                    lon: String(s.lon),
                  })
                  setShowSug(false)
                }}
              >
                {s.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white py-4 font-bold text-black disabled:opacity-50"
      >
        {loading ? 'Calcul…' : 'Calculer'}
      </button>
    </form>
  )
}
