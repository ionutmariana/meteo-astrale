'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

type Language = 'fr' | 'en' | 'es' | 'jp' | 'ro'

const COUNTRIES = [
  {code:'AF',name:'Afghanistan'},{code:'ZA',name:'Afrique du Sud'},{code:'AL',name:'Albanie'},{code:'DZ',name:'Algérie'},{code:'DE',name:'Allemagne'},{code:'AD',name:'Andorre'},{code:'AO',name:'Angola'},{code:'SA',name:'Arabie Saoudite'},{code:'AR',name:'Argentine'},{code:'AM',name:'Arménie'},{code:'AU',name:'Australie'},{code:'AT',name:'Autriche'},{code:'AZ',name:'Azerbaïdjan'},{code:'BE',name:'Belgique'},{code:'BD',name:'Bangladesh'},{code:'BY',name:'Biélorussie'},{code:'BO',name:'Bolivie'},{code:'BA',name:'Bosnie'},{code:'BR',name:'Brésil'},{code:'BG',name:'Bulgarie'},{code:'CM',name:'Cameroun'},{code:'CA',name:'Canada'},{code:'CL',name:'Chili'},{code:'CN',name:'Chine'},{code:'CO',name:'Colombie'},{code:'CR',name:'Costa Rica'},{code:'HR',name:'Croatie'},{code:'CU',name:'Cuba'},{code:'DK',name:'Danemark'},{code:'EC',name:'Equateur'},{code:'EG',name:'Egypte'},{code:'AE',name:'Emirats Arabes Unis'},{code:'ES',name:'Espagne'},{code:'EE',name:'Estonie'},{code:'ET',name:'Ethiopie'},{code:'FI',name:'Finlande'},{code:'FR',name:'France'},{code:'GE',name:'Géorgie'},{code:'GH',name:'Ghana'},{code:'GR',name:'Grèce'},{code:'GT',name:'Guatemala'},{code:'HN',name:'Honduras'},{code:'HU',name:'Hongrie'},{code:'IN',name:'Inde'},{code:'ID',name:'Indonésie'},{code:'IQ',name:'Irak'},{code:'IR',name:'Iran'},{code:'IE',name:'Irlande'},{code:'IS',name:'Islande'},{code:'IL',name:'Israël'},{code:'IT',name:'Italie'},{code:'CI',name:'Côte d Ivoire'},{code:'JM',name:'Jamaïque'},{code:'JP',name:'Japon'},{code:'JO',name:'Jordanie'},{code:'KZ',name:'Kazakhstan'},{code:'KE',name:'Kenya'},{code:'KG',name:'Kirghizistan'},{code:'KW',name:'Koweït'},{code:'LV',name:'Lettonie'},{code:'LB',name:'Liban'},{code:'LT',name:'Lituanie'},{code:'LU',name:'Luxembourg'},{code:'MK',name:'Macédoine'},{code:'MY',name:'Malaisie'},{code:'MA',name:'Maroc'},{code:'MU',name:'Maurice'},{code:'MX',name:'Mexique'},{code:'MD',name:'Moldavie'},{code:'MN',name:'Mongolie'},{code:'ME',name:'Monténégro'},{code:'MZ',name:'Mozambique'},{code:'NA',name:'Namibie'},{code:'NP',name:'Népal'},{code:'NG',name:'Nigéria'},{code:'NO',name:'Norvège'},{code:'NZ',name:'Nouvelle-Zélande'},{code:'PK',name:'Pakistan'},{code:'PA',name:'Panama'},{code:'PY',name:'Paraguay'},{code:'NL',name:'Pays-Bas'},{code:'PE',name:'Pérou'},{code:'PH',name:'Philippines'},{code:'PL',name:'Pologne'},{code:'PT',name:'Portugal'},{code:'QA',name:'Qatar'},{code:'RO',name:'Roumanie'},{code:'GB',name:'Royaume-Uni'},{code:'RU',name:'Russie'},{code:'SN',name:'Sénégal'},{code:'RS',name:'Serbie'},{code:'SG',name:'Singapour'},{code:'SK',name:'Slovaquie'},{code:'SI',name:'Slovénie'},{code:'SO',name:'Somalie'},{code:'SD',name:'Soudan'},{code:'SE',name:'Suède'},{code:'CH',name:'Suisse'},{code:'SY',name:'Syrie'},{code:'TW',name:'Taïwan'},{code:'TZ',name:'Tanzanie'},{code:'TH',name:'Thaïlande'},{code:'CZ',name:'Tchéquie'},{code:'TN',name:'Tunisie'},{code:'TR',name:'Turquie'},{code:'TM',name:'Turkménistan'},{code:'UA',name:'Ukraine'},{code:'UY',name:'Uruguay'},{code:'UZ',name:'Ouzbékistan'},{code:'VE',name:'Venezuela'},{code:'VN',name:'Viêt Nam'},{code:'YE',name:'Yémen'},{code:'ZW',name:'Zimbabwe'},{code:'US',name:'États-Unis'},
]

const L: Record<Language, Record<string,string>> = {
  fr:{Sun:'Soleil',Moon:'Lune',Mercury:'Mercure',Venus:'Vénus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturne',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluton',Aries:'Bélier',Taurus:'Taureau',Gemini:'Gémeaux',Cancer:'Cancer',Leo:'Lion',Virgo:'Vierge',Libra:'Balance',Scorpio:'Scorpion',Sagittarius:'Sagittaire',Capricorn:'Capricorne',Aquarius:'Verseau',Pisces:'Poissons',House:'Maison',Ascendant:'Ascendant',MC:'Milieu du Ciel'},
}
function tr(lang: Language, k?: string) { return k ? (L[lang]?.[k] || k) : '' }

export default function CarteNatale() {
  const [lang, setLang] = useState<Language>('fr')
  const [form, setForm] = useState({name:'',birthDate:'',birthTime:'',birthCountry:'FR',birthCity:'',email:'',lat:'',lon:''})
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSug, setShowSug] = useState(false)
  const timer = useRef<any>(null)

  async function searchCity(q: string) {
    if (q.length < 2) { setSuggestions([]); return }
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&limit=8&format=json&addressdetails=1&featuretype=city`)
      const d = await r.json()
      setSuggestions(d || [])
      setShowSug(true)
    } catch { setSuggestions([]) }
  }

  function onCity(v: string) {
    setForm({...form,birthCity:v,lat:'',lon:''})
    clearTimeout(timer.current)
    timer.current = setTimeout(()=>searchCity(v),400)
  }

  function pickCity(c: any) {
    const name = c.address?.city||c.address?.town||c.address?.village||c.display_name.split(',')[0]
    setForm({...form,birthCity:name,lat:c.lat,lon:c.lon})
    setShowSug(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.lat) { setError('Sélectionnez la ville dans la liste'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/natal-chart',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
    } catch { setError('Erreur de connexion') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#05010d] text-white selection:bg-amber-500/30">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {!result ? (
          <div className="animate-in fade-in duration-700">
            <h1 className="text-4xl font-serif text-center mb-10 tracking-tight">Votre Carte Natale</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Prénom</label>
                  <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-amber-500/50 outline-none transition" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Email</label>
                  <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-amber-500/50 outline-none transition" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Date</label>
                  <input type="date" value={form.birthDate} onChange={e=>setForm({...form,birthDate:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Heure</label>
                  <input type="time" value={form.birthTime} onChange={e=>setForm({...form,birthTime:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Pays</label>
                <select value={form.birthCountry} onChange={e=>setForm({...form,birthCountry:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none">
                  {COUNTRIES.map(c=>(<option key={c.code} value={c.code} className="bg-[#05010d]">{c.name}</option>))}
                </select>
              </div>

              <div className="relative space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Ville de naissance</label>
                <input type="text" value={form.birthCity} onChange={e=>onCity(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:border-amber-500/50 outline-none transition" required />
                {showSug && suggestions.length > 0 && (
                  <ul className="absolute z-50 w-full bg-[#0d011a] border border-white/10 rounded-2xl mt-2 max-h-48 overflow-y-auto shadow-2xl">
                    {suggestions.map((c,i)=>(<li key={i} onClick={()=>pickCity(c)} className="px-5 py-3 hover:bg-amber-500/10 cursor-pointer text-sm border-b border-white/5 last:border-0">{c.display_name}</li>))}
                  </ul>
                )}
              </div>

              {error && <p className="text-red-400 text-center text-xs pt-2">{error}</p>}
              <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-amber-400 transition transform active:scale-95 disabled:opacity-50 mt-4">
                {loading ? "Calcul astral en cours..." : "Découvrir ma carte natale"}
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-8 duration-1000">
            <div className="text-center p-10 bg-white/[0.03] rounded-[3rem] border border-white/5 mb-8 shadow-2xl">
              <h2 className="text-4xl font-serif uppercase tracking-tighter mb-3">{form.name}</h2>
              <div className="flex justify-center gap-4 text-white/30 text-xs font-light">
                <span>{new Date(form.birthDate).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric'})}</span>
                <span>•</span>
                <span>{form.birthCity}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 text-center group hover:border-amber-500/30 transition">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4">Ascendant</p>
                <p className="text-3xl font-serif text-amber-400">{tr(lang, result.houses?.[0]?.sign) || tr(lang, result.ascendant)}</p>
              </div>
              <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 text-center group hover:border-amber-500/30 transition">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4">Milieu du Ciel</p>
                <p className="text-3xl font-serif text-amber-400">{tr(lang, result.houses?.[9]?.sign) || "..."}</p>
              </div>
            </div>

            <div className="bg-white/[0.02] rounded-3xl overflow-hidden border border-white/5">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/20">
                  <tr><th className="px-8 py-5 text-left font-medium">Planète</th><th className="px-8 py-5 text-center font-medium">Signe</th><th className="px-8 py-5 text-right font-medium">Degré</th></tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {result.planets?.map((p: any, i: number) => (
                    <tr key={i} className="hover:bg-white/[0.01] transition">
                      <td className="px-8 py-4 font-medium text-white/80">{tr(lang, p.name)}</td>
                      <td className="px-8 py-4 text-center text-white/60 font-serif">{tr(lang, p.sign)}</td>
                      <td className="px-8 py-4 text-right font-mono text-white/30 italic">{p.degree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={()=>setResult(null)} className="w-full text-white/10 text-[10px] uppercase tracking-[0.5em] py-10 hover:text-white transition">Nouveau calcul</button>
          </div>
        )}
      </div>
    </div>
  )
}