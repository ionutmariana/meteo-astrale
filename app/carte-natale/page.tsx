'use client'
import { useState, useRef } from 'react'
import { Sun, ArrowUp, Mountain } from 'lucide-react'

export default function CarteNatale() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthCountry: 'FR',
    birthCity: '',
    lat: '',
    lon: '',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSug, setShowSug] = useState(false)
  const timer = useRef<any>(null)

  async function searchCity(q: string) {
    if (q.length < 3) return
    const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`)
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
      return alert('Veuillez sélectionner une ville dans la liste déroulante.')
    }

    setLoading(true)
    try {
      const res = await fetch('/api/natal-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      let data: any = null
      try {
        data = await res.json()
      } catch {
        // ignore
      }

      if (!res.ok) throw new Error(data?.error || 'Erreur serveur')
      setResult(data ?? {})
    } catch (err) {
      console.error(err)
      alert('Une erreur est survenue lors du calcul. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }

  const pillarCardClass =
    'rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'

  const planetsWithoutSun = Array.isArray(result?.planets)
    ? result.planets.filter((p: any) => p?.name !== 'Soleil')
    : []

  return (
    <div className="min-h-screen bg-[#05010d] text-white p-8">
      {!result ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white/5 p-8 rounded-3xl border border-white/10">
          <h1 className="text-2xl font-serif text-center mb-6">Votre Carte Natale</h1>

          <input
            type="text"
            placeholder="Prénom"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={form.birthDate}
              onChange={e => setForm({ ...form, birthDate: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3"
              required
            />
            <input
              type="time"
              value={form.birthTime}
              onChange={e => setForm({ ...form, birthTime: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Ville de naissance"
              value={form.birthCity}
              onChange={e => handleCityChange(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
              required
            />
            {showSug && suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-[#0d011a] border border-white/20 rounded-xl mt-1 shadow-2xl">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setForm({ ...form, birthCity: s.display_name, lat: s.lat, lon: s.lon })
                      setShowSug(false)
                    }}
                    className="p-3 hover:bg-amber-500/20 cursor-pointer text-sm border-b border-white/5"
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition disabled:opacity-50">
            {loading ? 'Calcul en cours...' : 'Découvrir ma carte'}
          </button>
        </form>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
            <h2 className="text-3xl font-serif text-amber-400 uppercase">{result?.name ?? form.name ?? '—'}</h2>
            <p className="text-white/40">{form.birthDate} — {form.birthCity}</p>
          </div>

          {/* Luxury pillars: mobile stack / desktop 3 cols */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={pillarCardClass}>
              <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
                <Sun className="w-4 h-4 text-amber-300" />
                <p className="text-[10px] uppercase tracking-wider">Soleil</p>
              </div>
              <p className="text-2xl font-serif text-center text-amber-300">
                {result?.soleil?.sign ?? '—'} {result?.soleil?.degree ?? '—'}°
              </p>
            </div>

            <div className={pillarCardClass}>
              <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
                <ArrowUp className="w-4 h-4 text-amber-300" />
                <p className="text-[10px] uppercase tracking-wider">Ascendant</p>
              </div>
              <p className="text-2xl font-serif text-center text-amber-300">
                {result?.ascendant?.sign ?? '—'} {result?.ascendant?.degree ?? '—'}°
              </p>
            </div>

            <div className={pillarCardClass}>
              <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
                <Mountain className="w-4 h-4 text-amber-300" />
                <p className="text-[10px] uppercase tracking-wider">Milieu du Ciel</p>
              </div>
              <p className="text-2xl font-serif text-center text-amber-300">
                {result?.mc?.sign ?? '—'} {result?.mc?.degree ?? '—'}°
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-widest text-white/30 mb-4">Positions Planétaires</h3>
            {planetsWithoutSun.map((p: any, i: number) => (
              <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="font-medium">{p?.name ?? '—'}</span>
                <span className="text-amber-400">{p?.sign ?? '—'} {p?.degree ?? '—'}°</span>
              </div>
            ))}
          </div>

          <button onClick={() => setResult(null)} className="w-full text-white/20 text-xs uppercase tracking-widest pt-8">
            Nouveau calcul
          </button>
        </div>
      )}
    </div>
  )
}