'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

type Language = 'fr' | 'en' | 'es' | 'jp' | 'ro'

const COUNTRIES = [
  {code:'AF',name:'Afghanistan'},{code:'ZA',name:'Afrique du Sud'},{code:'AL',name:'Albanie'},{code:'DZ',name:'Algérie'},{code:'DE',name:'Allemagne'},{code:'AD',name:'Andorre'},{code:'AO',name:'Angola'},{code:'SA',name:'Arabie Saoudite'},{code:'AR',name:'Argentine'},{code:'AM',name:'Arménie'},{code:'AU',name:'Australie'},{code:'AT',name:'Autriche'},{code:'AZ',name:'Azerbaïdjan'},{code:'BE',name:'Belgique'},{code:'BD',name:'Bangladesh'},{code:'BY',name:'Biélorussie'},{code:'BO',name:'Bolivie'},{code:'BA',name:'Bosnie'},{code:'BR',name:'Brésil'},{code:'BG',name:'Bulgarie'},{code:'CM',name:'Cameroun'},{code:'CA',name:'Canada'},{code:'CL',name:'Chili'},{code:'CN',name:'Chine'},{code:'CO',name:'Colombie'},{code:'CR',name:'Costa Rica'},{code:'HR',name:'Croatie'},{code:'CU',name:'Cuba'},{code:'DK',name:'Danemark'},{code:'EC',name:'Equateur'},{code:'EG',name:'Egypte'},{code:'AE',name:'Emirats Arabes Unis'},{code:'ES',name:'Espagne'},{code:'EE',name:'Estonie'},{code:'ET',name:'Ethiopie'},{code:'FI',name:'Finlande'},{code:'FR',name:'France'},{code:'GE',name:'Géorgie'},{code:'GH',name:'Ghana'},{code:'GR',name:'Grèce'},{code:'GT',name:'Guatemala'},{code:'HN',name:'Honduras'},{code:'HU',name:'Hongrie'},{code:'IN',name:'Inde'},{code:'ID',name:'Indonésie'},{code:'IQ',name:'Irak'},{code:'IR',name:'Iran'},{code:'IE',name:'Irlande'},{code:'IS',name:'Islande'},{code:'IL',name:'Israël'},{code:'IT',name:'Italie'},{code:'CI',name:'Côte d Ivoire'},{code:'JM',name:'Jamaïque'},{code:'JP',name:'Japon'},{code:'JO',name:'Jordanie'},{code:'KZ',name:'Kazakhstan'},{code:'KE',name:'Kenya'},{code:'KG',name:'Kirghizistan'},{code:'KW',name:'Koweït'},{code:'LV',name:'Lettonie'},{code:'LB',name:'Liban'},{code:'LT',name:'Lituanie'},{code:'LU',name:'Luxembourg'},{code:'MK',name:'Macédoine'},{code:'MY',name:'Malaisie'},{code:'MA',name:'Maroc'},{code:'MU',name:'Maurice'},{code:'MX',name:'Mexique'},{code:'MD',name:'Moldavie'},{code:'MN',name:'Mongolie'},{code:'ME',name:'Monténégro'},{code:'MZ',name:'Mozambique'},{code:'NA',name:'Namibie'},{code:'NP',name:'Népal'},{code:'NG',name:'Nigéria'},{code:'NO',name:'Norvège'},{code:'NZ',name:'Nouvelle-Zélande'},{code:'PK',name:'Pakistan'},{code:'PA',name:'Panama'},{code:'PY',name:'Paraguay'},{code:'NL',name:'Pays-Bas'},{code:'PE',name:'Pérou'},{code:'PH',name:'Philippines'},{code:'PL',name:'Pologne'},{code:'PT',name:'Portugal'},{code:'QA',name:'Qatar'},{code:'RO',name:'Roumanie'},{code:'GB',name:'Royaume-Uni'},{code:'RU',name:'Russie'},{code:'SN',name:'Sénégal'},{code:'RS',name:'Serbie'},{code:'SG',name:'Singapour'},{code:'SK',name:'Slovaquie'},{code:'SI',name:'Slovénie'},{code:'SO',name:'Somalie'},{code:'SD',name:'Soudan'},{code:'SE',name:'Suède'},{code:'CH',name:'Suisse'},{code:'SY',name:'Syrie'},{code:'TW',name:'Taïwan'},{code:'TZ',name:'Tanzanie'},{code:'TH',name:'Thaïlande'},{code:'CZ',name:'Tchéquie'},{code:'TN',name:'Tunisie'},{code:'TR',name:'Turquie'},{code:'TM',name:'Turkménistan'},{code:'UA',name:'Ukraine'},{code:'UY',name:'Uruguay'},{code:'UZ',name:'Ouzbékistan'},{code:'VE',name:'Venezuela'},{code:'VN',name:'Viêt Nam'},{code:'YE',name:'Yémen'},{code:'ZW',name:'Zimbabwe'},{code:'US',name:'États-Unis'},
]

const L: Record<Language, Record<string,string>> = {
  fr:{Sun:'Soleil',Moon:'Lune',Mercury:'Mercure',Venus:'Vénus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturne',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluton',Aries:'Bélier',Taurus:'Taureau',Gemini:'Gémeaux',Cancer:'Cancer',Leo:'Lion',Virgo:'Vierge',Libra:'Balance',Scorpio:'Scorpion',Sagittarius:'Sagittaire',Capricorn:'Capricorne',Aquarius:'Verseau',Pisces:'Poissons',House:'Maison',Ascendant:'Ascendant',MC:'Milieu du Ciel'},
  en:{Sun:'Sun',Moon:'Moon',Mercury:'Mercury',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluto',Aries:'Aries',Taurus:'Taurus',Gemini:'Gemini',Cancer:'Cancer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Scorpio:'Scorpio',Sagittarius:'Sagittarius',Capricorn:'Capricorn',Aquarius:'Aquarius',Pisces:'Pisces',House:'House',Ascendant:'Ascendant',MC:'Midheaven'},
  es:{Sun:'Sol',Moon:'Luna',Mercury:'Mercurio',Venus:'Venus',Mars:'Marte',Jupiter:'Jupiter',Saturn:'Saturno',Uranus:'Urano',Neptune:'Neptuno',Pluto:'Plutón',Aries:'Aries',Taurus:'Tauro',Gemini:'Géminis',Cancer:'Cáncer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Scorpio:'Escorpio',Sagittarius:'Sagitario',Capricorn:'Capricornio',Aquarius:'Acuario',Pisces:'Piscis',House:'Casa',Ascendant:'Ascendente',MC:'Medio Cielo'},
  jp:{Sun:'太陽',Moon:'月',Mercury:'水星',Venus:'金星',Mars:'火星',Jupiter:'木星',Saturn:'土星',Uranus:'天王星',Neptune:'海王星',Pluto:'冥王星',Aries:'牡羊座',Taurus:'牡牛座',Gemini:'双子座',Cancer:'蟹座',Leo:'獅子座',Virgo:'乙女座',Libra:'天秤座',Scorpio:'蠍座',Sagittarius:'射手座',Capricorn:'山羊座',Aquarius:'水瓶座',Pisces:'魚座',House:'室',Ascendant:'アセンダント',MC:'天頂'},
  ro:{Sun:'Soare',Moon:'Lună',Mercury:'Mercur',Venus:'Venus',Mars:'Marte',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptun',Pluto:'Pluto',Aries:'Berbec',Taurus:'Taur',Gemini:'Gemeni',Cancer:'Rac',Leo:'Leu',Virgo:'Fecioară',Libra:'Balanță',Scorpio:'Scorpion',Sagittarius:'Săgetător',Capricorn:'Capricorn',Aquarius:'Vărsător',Pisces:'Pești',House:'Casă',Ascendant:'Ascendent',MC:'Mijlocul Cerului'},
}
function tr(lang: Language, k?: string) { return k ? (L[lang]?.[k] || k) : '' }

export default function CarteNatale() {
  const [lang, setLang] = useState<Language>('fr')
  const [form, setForm] = useState({name:'',birthDate:'',birthTime:'',birthCountry:'FR',birthCity:'',email:'',lat:'',lon:''})
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [searching, setSearching] = useState(false)
  const [showSug, setShowSug] = useState(false)
  const timer = useRef<any>(null)

  async function searchCity(q: string) {
    if (q.length < 2) { setSuggestions([]); return }
    setSearching(true)
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&limit=8&format=json&addressdetails=1&featuretype=city`)
      const d = await r.json()
      setSuggestions(d || [])
      setShowSug(true)
    } catch { setSuggestions([]) }
    finally { setSearching(false) }
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
    if (!form.lat) return
    setLoading(true)
    try {
      const res = await fetch('/api/natal-chart',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
    } catch { setError('Erreur') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#05010d] text-white font-sans">
      <nav className="p-4 border-b border-white/5 flex justify-between items-center">
        <Link href="/" className="font-bold text-amber-400">✧ Meteo Astrale</Link>
        <select value={lang} onChange={e=>setLang(e.target.value as Language)} className="bg-transparent text-xs border border-white/10 rounded px-2 py-1">
          <option value="fr">FR</option><option value="en">EN</option>
        </select>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
            <h1 className="text-3xl font-serif text-center mb-8">Votre Carte Natale</h1>
            <input type="text" placeholder="Prénom" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" required />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={form.birthDate} onChange={e=>setForm({...form,birthDate:e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3" required />
              <input type="time" value={form.birthTime} onChange={e=>setForm({...form,birthTime:e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3" required />
            </div>
            <div className="relative">
              <input type="text" placeholder="Ville de naissance" value={form.birthCity} onChange={e=>onCity(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" required />
              {showSug && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full bg-[#0d011a] border border-white/10 rounded-xl mt-1 overflow-hidden">
                  {suggestions.map((c,i)=>(<li key={i} onClick={()=>pickCity(c)} className="px-4 py-2 hover:bg-purple-500/20 cursor-pointer text-sm">{c.display_name}</li>))}
                </ul>
              )}
            </div>
            <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition">
              {loading ? "Calcul..." : "Découvrir ma carte"}
            </button>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="text-center p-10 bg-white/5 rounded-[2.5rem] border border-white/10">
              <h2 className="text-3xl font-serif uppercase tracking-widest mb-2">{form.name}</h2>
              <p className="text-white/40 text-sm">{form.birthDate} — {form.birthCity}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Ascendant</p>
                <p className="text-2xl font-serif">{tr(lang, result.houses?.[0]?.sign) || tr(lang, result.ascendant) || "..."}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Milieu du Ciel</p>
                <p className="text-2xl font-serif">{tr(lang, result.houses?.[9]?.sign) || "..."}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-white/30">
                    <th className="px-6 py-4 text-left">Planète</th>
                    <th className="px-6 py-4 text-center">Signe</th>
                    <th className="px-6 py-4 text-right">Degré</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {result.planets?.map((p: any, i: number) => (
                    <tr key={i}>
                      <td className="px-6 py-4 font-medium">{tr(lang, p.name)}</td>
                      <td className="px-6 py-4 text-center text-white/70">{tr(lang, p.sign)}</td>
                      <td className="px-6 py-4 text-right font-mono text-white/40">{p.degree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={()=>setResult(null)} className="w-full text-white/20 text-[10px] uppercase tracking-[0.4em] py-4">Refaire un calcul</button>
          </div>
        )}
      </div>
    </div>
  )
}