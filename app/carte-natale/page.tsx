'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

type Language = 'fr' | 'en' | 'es' | 'jp' | 'ro'

const COUNTRIES = [
  {code:'AF',name:'Afghanistan'},{code:'ZA',name:'Afrique du Sud'},{code:'AL',name:'Albanie'},{code:'DZ',name:'Algérie'},{code:'DE',name:'Allemagne'},{code:'AD',name:'Andorre'},{code:'AO',name:'Angola'},{code:'SA',name:'Arabie Saoudite'},{code:'AR',name:'Argentine'},{code:'AM',name:'Arménie'},{code:'AU',name:'Australie'},{code:'AT',name:'Autriche'},{code:'AZ',name:'Azerbaïdjan'},{code:'BE',name:'Belgique'},{code:'BD',name:'Bangladesh'},{code:'BY',name:'Biélorussie'},{code:'BO',name:'Bolivie'},{code:'BA',name:'Bosnie'},{code:'BR',name:'Brésil'},{code:'BG',name:'Bulgarie'},{code:'CM',name:'Cameroun'},{code:'CA',name:'Canada'},{code:'CL',name:'Chili'},{code:'CN',name:'Chine'},{code:'CO',name:'Colombie'},{code:'CR',name:'Costa Rica'},{code:'HR',name:'Croatie'},{code:'CU',name:'Cuba'},{code:'DK',name:'Danemark'},{code:'EC',name:'Equateur'},{code:'EG',name:'Egypte'},{code:'AE',name:'Emirats Arabes Unis'},{code:'ES',name:'Espagne'},{code:'EE',name:'Estonie'},{code:'ET',name:'Ethiopie'},{code:'FI',name:'Finlande'},{code:'FR',name:'France'},{code:'GE',name:'Géorgie'},{code:'GH',name:'Ghana'},{code:'GR',name:'Grèce'},{code:'GT',name:'Guatemala'},{code:'HN',name:'Honduras'},{code:'HU',name:'Hongrie'},{code:'IN',name:'Inde'},{code:'ID',name:'Indonésie'},{code:'IQ',name:'Irak'},{code:'IR',name:'Iran'},{code:'IE',name:'Irlande'},{code:'IS',name:'Islande'},{code:'IL',name:'Israël'},{code:'IT',name:'Italie'},{code:'CI',name:'Côte d Ivoire'},{code:'JM',name:'Jamaïque'},{code:'JP',name:'Japon'},{code:'JO',name:'Jordanie'},{code:'KZ',name:'Kazakhstan'},{code:'KE',name:'Kenya'},{code:'KG',name:'Kirghizistan'},{code:'KW',name:'Koweït'},{code:'LV',name:'Lettonie'},{code:'LB',name:'Liban'},{code:'LT',name:'Lituanie'},{code:'LU',name:'Luxembourg'},{code:'MK',name:'Macédoine'},{code:'MY',name:'Malaisie'},{code:'MA',name:'Maroc'},{code:'MU',name:'Maurice'},{code:'MX',name:'Mexique'},{code:'MD',name:'Moldavie'},{code:'MN',name:'Mongolie'},{code:'ME',name:'Monténégro'},{code:'MZ',name:'Mozambique'},{code:'NA',name:'Namibie'},{code:'NP',name:'Népal'},{code:'NG',name:'Nigéria'},{code:'NO',name:'Norvège'},{code:'NZ',name:'Nouvelle-Zélande'},{code:'PK',name:'Pakistan'},{code:'PA',name:'Panama'},{code:'PY',name:'Paraguay'},{code:'NL',name:'Pays-Bas'},{code:'PE',name:'Pérou'},{code:'PH',name:'Philippines'},{code:'PL',name:'Pologne'},{code:'PT',name:'Portugal'},{code:'QA',name:'Qatar'},{code:'RO',name:'Roumanie'},{code:'GB',name:'Royaume-Uni'},{code:'RU',name:'Russie'},{code:'SN',name:'Sénégal'},{code:'RS',name:'Serbie'},{code:'SG',name:'Singapour'},{code:'SK',name:'Slovaquie'},{code:'SI',name:'Slovénie'},{code:'SO',name:'Somalie'},{code:'SD',name:'Soudan'},{code:'SE',name:'Suède'},{code:'CH',name:'Suisse'},{code:'SY',name:'Syrie'},{code:'TW',name:'Taïwan'},{code:'TZ',name:'Tanzanie'},{code:'TH',name:'Thaïlande'},{code:'CZ',name:'Tchéquie'},{code:'TN',name:'Tunisie'},{code:'TR',name:'Turquie'},{code:'TM',name:'Turkménistan'},{code:'UA',name:'Ukraine'},{code:'UY',name:'Uruguay'},{code:'UZ',name:'Ouzbékistan'},{code:'VE',name:'Venezuela'},{code:'VN',name:'Viêt Nam'},{code:'YE',name:'Yémen'},{code:'ZW',name:'Zimbabwe'},{code:'US',name:'États-Unis'},
]

const L: Record<Language, Record<string,string>> = {
  fr:{Sun:'Soleil',Moon:'Lune',Mercury:'Mercure',Venus:'Vénus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturne',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluton',Aries:'Bélier',Taurus:'Taureau',Gemini:'Gémeaux',Cancer:'Cancer',Leo:'Lion',Virgo:'Vierge',Libra:'Balance',Scorpio:'Scorpion',Sagittarius:'Sagittaire',Capricorn:'Capricorne',Aquarius:'Verseau',Pisces:'Poissons',House:'Maison',Ascendant:'Ascendant',MC:'Milieu du Ciel (MC)'},
  en:{Sun:'Sun',Moon:'Moon',Mercury:'Mercury',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluto',Aries:'Aries',Taurus:'Taurus',Gemini:'Gemini',Cancer:'Cancer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Scorpio:'Scorpio',Sagittarius:'Sagittarius',Capricorn:'Capricorn',Aquarius:'Aquarius',Pisces:'Pisces',House:'House',Ascendant:'Ascendant',MC:'Midheaven (MC)'},
  es:{Sun:'Sol',Moon:'Luna',Mercury:'Mercurio',Venus:'Venus',Mars:'Marte',Jupiter:'Jupiter',Saturn:'Saturno',Uranus:'Urano',Neptune:'Neptuno',Pluto:'Plutón',Aries:'Aries',Taurus:'Tauro',Gemini:'Géminis',Cancer:'Cáncer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Scorpio:'Escorpio',Sagittarius:'Sagitario',Capricorn:'Capricornio',Aquarius:'Acuario',Pisces:'Piscis',House:'Casa',Ascendant:'Ascendente',MC:'Medio Cielo (MC)'},
  jp:{Sun:'太陽',Moon:'月',Mercury:'水星',Venus:'金星',Mars:'火星',Jupiter:'木星',Saturn:'土星',Uranus:'天王星',Neptune:'海王星',Pluto:'冥王星',Aries:'牡羊座',Taurus:'牡牛座',Gemini:'双子座',Cancer:'蟹座',Leo:'獅子座',Virgo:'乙女座',Libra:'天秤座',Scorpio:'蠍座',Sagittarius:'射手座',Capricorn:'山羊座',Aquarius:'水瓶座',Pisces:'魚座',House:'室',Ascendant:'アセンダント',MC:'天頂 (MC)'},
  ro:{Sun:'Soare',Moon:'Lună',Mercury:'Mercur',Venus:'Venus',Mars:'Marte',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptun',Pluto:'Pluto',Aries:'Berbec',Taurus:'Taur',Gemini:'Gemeni',Cancer:'Rac',Leo:'Leu',Virgo:'Fecioară',Libra:'Balanță',Scorpio:'Scorpion',Sagittarius:'Săgetător',Capricorn:'Capricorn',Aquarius:'Vărsător',Pisces:'Pești',House:'Casă',Ascendant:'Ascendent',MC:'Mijlocul Cerului (MC)'},
}
function tr(lang: Language, k?: string) { return k ? (L[lang]?.[k] || k) : '' }

const UI: Record<Language,Record<string,string>> = {
  fr:{title:'Votre Carte Natale',sub:'Découvrez votre thème astral — résultats instantanés',name:'Prénom',date:'Date de naissance',time:'Heure de naissance',country:'Pays',city:'Ville de naissance',email:'Votre email',emailNote:'Recevez votre analyse par email — 100% gratuit',btn:'Calculer ma carte natale gratuitement',loading:'Calcul en cours...',planets:'Positions des Planètes',houses:'Maisons',sign:'Signe',pos:'Position',house:'Maison',back:'Nouvelle recherche',searching:'Recherche...',ascTitle:'Ascendant',mcTitle:'Milieu du Ciel (MC)'},
  en:{title:'Your Birth Chart',sub:'Discover your astral theme — instant results',name:'First name',date:'Birth date',time:'Birth time',country:'Country',city:'Birth city',email:'Your email',emailNote:'Receive your analysis by email — 100% free',btn:'Calculate my birth chart for free',loading:'Calculating...',planets:'Planetary Positions',houses:'Houses',sign:'Sign',pos:'Position',house:'House',back:'New search',searching:'Searching...',ascTitle:'Ascendant',mcTitle:'Midheaven (MC)'},
  es:{title:'Tu Carta Natal',sub:'Descubre tu tema astral — resultados instantáneos',name:'Nombre',date:'Fecha de nacimiento',time:'Hora de nacimiento',country:'País',city:'Ciudad de nacimiento',email:'Tu email',emailNote:'Recibe tu análisis por email — 100% gratis',btn:'Calcular mi carta natal gratis',loading:'Calculando...',planets:'Posiciones Planetarias',houses:'Casas',sign:'Signo',pos:'Posición',house:'Casa',back:'Nueva búsqueda',searching:'Buscando...',ascTitle:'Ascendente',mcTitle:'Medio Cielo (MC)'},
  jp:{title:'出生ホロスコープ',sub:'星座テーマを発見 — 即時結果',name:'お名前',date:'生年月日',time:'出生時刻',country:'国',city:'出生都市',email:'メールアドレス',emailNote:'無料で分析をメールで受け取る',btn:'無料でチャートを計算',loading:'計算中...',planets:'惑星の位置',houses:'ハウス',sign:'サイン',pos:'位置',house:'室',back:'新しい検索',searching:'検索中...',ascTitle:'アセンダント',mcTitle:'天頂 (MC)'},
  ro:{title:'Harta Natală',sub:'Descoperă-ți tema astrală — rezultate instantanee',name:'Prenume',date:'Data nașterii',time:'Ora nașterii',country:'Țară',city:'Orașul nașterii',email:'Email-ul tău',emailNote:'Primește analiza pe email — 100% gratuit',btn:'Calculează harta natală gratuit',loading:'Se calculează...',planets:'Pozițiile Planetelor',houses:'Case',sign:'Semn',pos:'Poziție',house:'Casă',back:'Căutare nouă',searching:'Se caută...',ascTitle:'Ascendent',mcTitle:'Mijlocul Cerului (MC)'},
}

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
  const u = UI[lang]

  async function searchCity(q: string) {
    if (q.length < 2) { setSuggestions([]); return }
    setSearching(true)
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&limit=8&format=json&addressdetails=1&featuretype=city`,{headers:{'Accept-Language':'fr'}})
      const d = await r.json()
      setSuggestions(d.slice(0,8))
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
    setSuggestions([])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.lat) { setError('Veuillez sélectionner une ville dans la liste de suggestions'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/natal-chart',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })
      if (!res.ok) throw new Error('err')
      const data = await res.json()
      setResult(data)
    } catch { setError('Erreur lors du calcul. Veuillez réessayer.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#05010d] text-white selection:bg-purple-500/30">
      <nav className="border-b border-white/5 p-4 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="text-xl font-medium tracking-tighter hover:opacity-80 transition flex items-center gap-2">
          <span className="text-amber-400 text-2xl">✧</span> Meteo Astrale
        </Link>
        <select value={lang} onChange={e=>setLang(e.target.value as Language)} className="bg-white/5 text-white border border-white/10 rounded-full px-4 py-1 text-xs focus:ring-1 ring-purple-500 outline-none transition">
          <option value="fr">🇫🇷 FR</option><option value="en">🇬🇧 EN</option><option value="es">🇪🇸 ES</option><option value="jp">🇯🇵 JP</option><option value="ro">🇷🇴 RO</option>
        </select>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {!result && (
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif mb-4 tracking-tight">{u.title}</h1>
            <p className="text-purple-300/60 font-light italic">{u.sub}</p>
          </div>
        )}

        {!result ? (
          <form onSubmit={handleSubmit} className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 space-y-6 border border-white/5 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{u.name}</label>
                <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 transition outline-none" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{u.email}</label>
                <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 transition outline-none" placeholder="Oubliez rien..." />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{u.date}</label>
                <input type="date" value={form.birthDate} onChange={e=>setForm({...form,birthDate:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 transition outline-none" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{u.time}</label>
                <input type="time" value={form.birthTime} onChange={e=>setForm({...form,birthTime:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 transition outline-none" required />
              </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{u.country}</label>
                <select value={form.birthCountry} onChange={e=>setForm({...form,birthCountry:e.target.value,birthCity:'',lat:'',lon:''})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 transition outline-none">
                  {COUNTRIES.map(c=>(<option key={c.code} value={c.code} className="bg-[#05010d]">{c.name}</option>))}
                </select>
            </div>

            <div className="relative space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">{u.city}</label>
              <input type="text" value={form.birthCity} onChange={e=>onCity(e.target.value)} onFocus={()=>form.birthCity.length>1&&setShowSug(true)} autoComplete="off" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 transition outline-none" required />
              {showSug && suggestions.length>0 && (
                <ul className="absolute z-50 w-full bg-[#0d011a] border border-white/10 rounded-xl mt-2 shadow-2xl overflow-hidden">
                  {suggestions.map((c,i)=>(<li key={i} onClick={()=>pickCity(c)} className="px-4 py-3 hover:bg-purple-500/20 cursor-pointer text-sm border-b border-white/5 last:border-0">{c.display_name}</li>))}
                </ul>
              )}
            </div>

            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-white text-black font-medium py-4 rounded-2xl hover:bg-amber-400 transition transform active:scale-[0.98] disabled:opacity-50">
              {loading ? u.loading : u.btn}
            </button>
          </form>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* 1. EN-TETE PROFIL */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 text-center mb-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                <h2 className="text-4xl font-serif mb-4 uppercase tracking-wider">{form.name}</h2>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/40 font-light">
                  <span>{new Date(form.birthDate).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>à {form.birthTime}</span>
                  <span className="flex items-center gap-1"><span className="text-amber-500">📍</span> {form.birthCity}</span>
                </div>
            </div>

            {/* 2. CARTES ASCENDANT & MILIEU DU CIEL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 hover:border-amber-500/20 transition group">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 text-center">{u.ascTitle}</p>
                <div className="flex items-center justify-center gap-4">
                   <div className="text-4xl text-purple-400 group-hover:scale-110 transition-transform">✦</div>
                   <h3 className="text-3xl font-serif">{tr(lang, result.houses?.[0]?.sign) || tr(lang, result.ascendant) || "..."}</h3>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 hover:border-amber-500/20 transition group">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 text-center">{u.mcTitle}</p>
                <div className="flex items-center justify-center gap-4">
                   <div className="text-4xl text-amber-500 group-hover:rotate-12 transition-transform">✧</div>
                   <h3 className="text-3xl font-serif">{tr(lang, result.houses?.[9]?.sign) || "..."}</h3>
                </div>
              </div>
            </div>

            {/* 3. TABLEAU DES PLANETES */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
              <div className="px-8 py-6 border-b border-white/5 bg-white/[0.01]">
                <h3 className="text-lg font-serif text-center uppercase tracking-widest">{u.planets}</h3>
              </div>
              <div className="overflow-x-auto px-8 py-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-white/30 text-left border-b border-white/5">
                      <th className="pb-4 font-normal">Planète</th>
                      <th className="pb-4 font-normal text-center">Signe</th>
                      <th className="pb-4 font-normal text-right">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02]">
                    {result.planets?.map((p: any, i: number) => (
                      <tr key={i} className="group hover:bg-white/[0.01] transition">
                        <td className="py-4 text-sm font-medium flex items-center gap-3">
                          <span className="text-amber-500/50 group-hover:text-amber-500 transition-colors">○</span> {tr(lang, p.name)}
                        </td>
                        <td className="py-4 text-sm text-white/70 text-center">{tr(lang, p.sign)}</td>
                        <td className="py-4 text-[11px] text-white/40 text-right font-mono italic">{p.degree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button onClick={()=>setResult(null)} className="w-full mt-12 py-4 text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition">
              {u.back}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}