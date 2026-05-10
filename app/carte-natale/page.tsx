'use client'
import { useState, useRef } from 'react'

export default function CarteNatale() {
  const [form, setForm] = useState({name:'', email:'', birthDate:'', birthTime:'', birthCountry:'FR', birthCity:'', lat:'', lon:''})
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSug, setShowSug] = useState(false)
  const timer = useRef<any>(null)

  async function searchCity(q: string) {
    if (q.length < 3) return
    const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`)
    const d = await r.json()
    setSuggestions(d)
    setShowSug(true)
  }

  const handleCityChange = (v: string) => {
    setForm({...form, birthCity: v, lat:'', lon:''})
    clearTimeout(timer.current)
    timer.current = setTimeout(() => searchCity(v), 500)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if(!form.lat) return alert("Veuillez sélectionner une ville dans la liste déroulante.")
    setLoading(true)
    try {
      const res = await fetch('/api/natal-chart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      })
      
      if (!res.ok) throw new Error('Erreur serveur')
      
      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      alert("Une erreur est survenue lors du calcul. Vérifiez votre connexion.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#05010d] text-white p-8">
      {!result ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white/5 p-8 rounded-3xl border border-white/10">
          <h1 className="text-2xl font-serif text-center mb-6">Votre Carte Natale</h1>
          
          <input type="text" placeholder="Prénom" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-amber-500" required />
          
          <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-amber-500" required />

          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={form.birthDate} onChange={e=>setForm({...form, birthDate:e.target.value})} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3" required />
            <input type="time" value={form.birthTime} onChange={e=>setForm({...form, birthTime:e.target.value})} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3" required />
          </div>

          <div className="relative">
            <input type="text" placeholder="Ville de naissance" value={form.birthCity} onChange={e=>handleCityChange(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-amber-500" required />
            {showSug && suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-[#0d011a] border border-white/20 rounded-xl mt-1 shadow-2xl">
                {suggestions.map((s, i) => (
                  <li key={i} onClick={() => {setForm({...form, birthCity: s.display_name, lat: s.lat, lon: s.lon}); setShowSug(false)}} className="p-3 hover:bg-amber-500/20 cursor-pointer text-sm border-b border-white/5">
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition disabled:opacity-50">
            {loading ? "Calcul en cours..." : "Découvrir ma carte"}
          </button>
        </form>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                <h2 className="text-3xl font-serif text-amber-400 uppercase">{result.name || form.name}</h2>
                <p className="text-white/40">{form.birthDate} — {form.birthCity}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] uppercase text-white/30">Ascendant</p>
                    <p className="text-xl font-serif">
                      {result.ascendant?.sign} {result.ascendant?.degree}°
                    </p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] uppercase text-white/30">Milieu du Ciel</p>
                    <p className="text-xl font-serif">
                      {result.mc?.sign} {result.mc?.degree}°
                    </p>
                </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm uppercase tracking-widest text-white/30 mb-4">Positions Planétaires</h3>
              {result.planets?.map((p: any, i: number) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-amber-400">{p.sign} {p.degree}°</span>
                </div>
              ))}
            </div>

            <button onClick={()=>setResult(null)} className="w-full text-white/20 text-xs uppercase tracking-widest pt-8">Nouveau calcul</button>
        </div>
      )}
    </div>
  )
}